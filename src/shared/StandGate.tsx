import { useState, type FormEvent, type ReactNode } from 'react';

const STORAGE_KEY = 'stand-auth-ok';
const STAND_PASSWORD = 'west';

function isUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function unlock(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // private mode — keep in-memory only for this session
  }
}

/** Mobile-friendly password gate (replaces HTTP Basic Auth). */
export default function StandGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(isUnlocked);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (ok) return children;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.trim() !== STAND_PASSWORD) {
      setError('Неверный пароль');
      return;
    }
    unlock();
    setOk(true);
  }

  return (
    <div className="min-h-full bg-zinc-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-zinc-700 bg-zinc-900 p-6 space-y-4"
      >
        <div>
          <p className="font-display text-xs font-600 tracking-widest text-orange-500 uppercase">
            Стенд гипотез
          </p>
          <h1 className="font-display text-2xl font-700 tracking-tight uppercase mt-2">
            Вход
          </h1>
          <p className="text-sm text-gray-400 mt-2">Введите пароль, чтобы открыть стенд.</p>
        </div>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-gray-500">Пароль</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="mt-1.5 w-full border border-zinc-600 bg-zinc-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"
          />
        </label>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-display text-base font-600 py-3 uppercase tracking-wide transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
