declare const __APP_BUILD_ID__: string

const RELOAD_FLAG = 'app-build-reload'

/**
 * After deploy, a tab may still run an old bundle.
 * Keep this lightweight — aggressive cache clearing hurts slow mobile networks.
 */
export async function ensureFreshBuild(): Promise<void> {
  if (import.meta.env.DEV) return

  try {
    const response = await fetch(`/version.json?_=${Date.now()}`, {
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    })
    if (!response.ok) return

    const data = (await response.json()) as { buildId?: string }
    if (!data.buildId || data.buildId === __APP_BUILD_ID__) return

    const flag = `${RELOAD_FLAG}:${data.buildId}`
    if (sessionStorage.getItem(flag)) return

    sessionStorage.setItem(flag, '1')
    window.location.reload()
  } catch {
    // Offline / slow network / blocked — keep current bundle.
  }
}
