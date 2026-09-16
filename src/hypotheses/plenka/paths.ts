export const PLENKA_BASE = '/plenka';

/** Build a path inside the plenka hypothesis. */
export function plenkaPath(path = ''): string {
  if (!path || path === '/') return PLENKA_BASE;

  if (path.startsWith('#')) {
    return `${PLENKA_BASE}${path}`;
  }

  if (path.startsWith('/#')) {
    return `${PLENKA_BASE}${path.slice(1)}`;
  }

  return `${PLENKA_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
