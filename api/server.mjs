import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function loadEnv() {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnv();

const PORT = Number(process.env.PORT || 3001);
const YOUGILE_API_URL = (process.env.YOUGILE_API_URL || 'https://yougile.com/api-v2').replace(/\/$/, '');
const YOUGILE_TOKEN = (process.env.YOUGILE_TOKEN || '').trim();
const YOUGILE_COLUMN_ID = (process.env.YOUGILE_COLUMN_ID || 'd8a00f44-9db9-4109-ae5e-b645a5d845bd').trim();

const hits = new Map();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 16_384) {
        reject(new Error('too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const max = 8;
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function validateLead(data) {
  const name = String(data.name || '').trim();
  const phone = String(data.phone || '').trim();
  const message = String(data.message || '').trim();
  const category = String(data.category || '').trim();

  if (name.length < 2 || name.length > 100) return 'Укажите имя';
  if (!/^[\d\s+()\-]{7,20}$/.test(phone)) return 'Некорректный телефон';
  if (message.length > 2000) return 'Слишком длинный комментарий';
  if (category.length > 200) return 'Некорректная категория';
  return { name, phone, message, category };
}

async function createYougileTask({ name, phone, message, category }) {
  if (!YOUGILE_TOKEN) {
    const error = new Error('YouGile token is not configured');
    error.status = 503;
    throw error;
  }

  const title = category ? `Заявка: ${name} — ${category}` : `Заявка: ${name}`;
  const description = [
    `<p><b>Имя:</b> ${escapeHtml(name)}</p>`,
    `<p><b>Телефон:</b> ${escapeHtml(phone)}</p>`,
    category ? `<p><b>Категория:</b> ${escapeHtml(category)}</p>` : '',
    message ? `<p><b>Комментарий:</b> ${escapeHtml(message)}</p>` : '<p>Комментарий не указан</p>',
    '<p>Источник: сайт west-services.ru</p>',
  ]
    .filter(Boolean)
    .join('');

  const response = await fetch(`${YOUGILE_API_URL}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${YOUGILE_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title,
      columnId: YOUGILE_COLUMN_ID,
      description,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`YouGile error ${response.status}: ${text.slice(0, 300)}`);
    error.status = 502;
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    json(res, 200, { ok: true, yougile: Boolean(YOUGILE_TOKEN) });
    return;
  }

  if (req.method !== 'POST' || url.pathname !== '/api/lead') {
    json(res, 404, { error: 'Not found' });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    json(res, 429, { error: 'Слишком много заявок. Попробуйте позже.' });
    return;
  }

  try {
    const raw = await readBody(req);
    const data = raw ? JSON.parse(raw) : {};
    const lead = validateLead(data);
    if (typeof lead === 'string') {
      json(res, 400, { error: lead });
      return;
    }
    await createYougileTask(lead);
    json(res, 200, { ok: true });
  } catch (err) {
    if (err instanceof SyntaxError) {
      json(res, 400, { error: 'Некорректные данные' });
      return;
    }
    if (err.message === 'too_large') {
      json(res, 413, { error: 'Слишком большой запрос' });
      return;
    }
    console.error(err);
    json(res, err.status || 500, { error: 'Не удалось отправить заявку' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`lead api listening on ${PORT}`);
});
