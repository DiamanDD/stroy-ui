export interface LeadPayload {
  name: string;
  phone: string;
  message: string;
  category: string;
  website?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Слишком много заявок. Попробуйте позже.');
    }
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || 'Не удалось отправить заявку');
  }
}
