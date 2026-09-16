export const YM_ID = 112288059;

export const YM_GOALS = {
  leadSubmit: 'lead_submit',
  phoneClick: 'phone_click',
} as const;

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  window.ym?.(YM_ID, 'reachGoal', goal, params);
}

export function hit(url: string, options?: { title?: string; referer?: string }) {
  window.ym?.(YM_ID, 'hit', url, options);
}
