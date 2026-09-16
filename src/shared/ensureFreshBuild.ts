declare const __APP_BUILD_ID__: string

const RELOAD_FLAG = 'app-build-reload'

async function clearBrowserCaches(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations()
      await Promise.all(regs.map((reg) => reg.unregister()))
    }
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
    }
  } catch {
    // ignore
  }
}

/**
 * After deploy, a tab may still run an old bundle (common on mobile).
 * Avoid query-param redirects — they break Basic Auth on iOS/WebViews.
 */
export async function ensureFreshBuild(): Promise<void> {
  if (import.meta.env.DEV) return

  try {
    await clearBrowserCaches()

    const response = await fetch(`/version.json?_=${Date.now()}`, {
      cache: 'no-store',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return

    const data = (await response.json()) as { buildId?: string }
    if (!data.buildId || data.buildId === __APP_BUILD_ID__) return

    const flag = `${RELOAD_FLAG}:${data.buildId}`
    if (sessionStorage.getItem(flag)) return

    sessionStorage.setItem(flag, '1')
    window.location.reload()
  } catch {
    // Offline / blocked — keep current bundle.
  }
}
