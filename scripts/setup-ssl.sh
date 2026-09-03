#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LE_DIR="${ROOT_DIR}/certs/letsencrypt"
WEBROOT="${ROOT_DIR}/certbot/www"
DOMAIN="$(printf '%s' "${SSL_DOMAIN:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
EMAIL="$(printf '%s' "${CERTBOT_EMAIL:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

if [[ -z "${DOMAIN}" || -z "${EMAIL}" ]]; then
  echo "SSL_DOMAIN and CERTBOT_EMAIL are required." >&2
  exit 1
fi

mkdir -p "${WEBROOT}" "${LE_DIR}"

CERT_FILE="${LE_DIR}/live/${DOMAIN}/fullchain.pem"
if [[ -f "${CERT_FILE}" ]]; then
  echo "Let's Encrypt certificate already exists for ${DOMAIN}"
  exit 0
fi

echo ">>> requesting Let's Encrypt certificate for ${DOMAIN}"

cd "${ROOT_DIR}"

if docker compose ps --status running app >/dev/null 2>&1; then
  docker compose run --rm certbot certonly \
    --webroot -w /var/www/certbot \
    -d "${DOMAIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive \
    --keep-until-expiring \
    --preferred-challenges http
else
  docker compose run --rm -p 80:80 certbot certonly \
    --standalone \
    -d "${DOMAIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive \
    --keep-until-expiring \
    --preferred-challenges http
fi

echo ">>> certificate obtained for ${DOMAIN}"
