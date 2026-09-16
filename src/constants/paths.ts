export const STORE_BASE = '/sm';

export function storePath(path = ''): string {
  if (!path || path === '/') return STORE_BASE;
  return `${STORE_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
