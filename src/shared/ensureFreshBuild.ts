declare const __APP_BUILD_ID__: string

const RELOAD_FLAG = 'app-build-reload'

/**
 * After deploy, an open tab may still run an old bundle.
 * Compare embedded build id with /version.json and reload once if stale.
 */
export async function ensureFreshBuild(): Promise<void> {
  if (import.meta.env.DEV) return

  try {
    const response = await fetch(`/version.json?_=${Date.now()}`, {
      cache: 'no-store',
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
