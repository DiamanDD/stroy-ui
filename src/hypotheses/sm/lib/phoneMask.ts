/** Russian mobile: +7 and 10 local digits (11 digits total). */
export const PHONE_LOCAL_LENGTH = 10;

export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/** Normalize raw digits to country code 7 + up to 10 local digits. */
export function normalizePhoneDigits(digits: string): string {
  if (!digits) return '';

  let normalized = digits;

  if (normalized.startsWith('8')) {
    normalized = `7${normalized.slice(1)}`;
  } else if (!normalized.startsWith('7')) {
    normalized = `7${normalized}`;
  }

  return normalized.slice(0, 1 + PHONE_LOCAL_LENGTH);
}

export function formatPhoneMask(value: string): string {
  const digits = normalizePhoneDigits(extractPhoneDigits(value));
  if (!digits) return '';

  const local = digits.slice(1);

  if (local.length === 0) return '+7';

  if (local.length <= 3) {
    return `+7 (${local}`;
  }

  if (local.length <= 6) {
    return `+7 (${local.slice(0, 3)}) ${local.slice(3)}`;
  }

  if (local.length <= 8) {
    return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  }

  return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8, PHONE_LOCAL_LENGTH)}`;
}

export function phoneToE164(value: string): string {
  const digits = normalizePhoneDigits(extractPhoneDigits(value));
  if (digits.length !== 1 + PHONE_LOCAL_LENGTH) return '';
  return `+${digits}`;
}

export function isCompletePhone(value: string): boolean {
  return normalizePhoneDigits(extractPhoneDigits(value)).length === 1 + PHONE_LOCAL_LENGTH;
}

export function phoneMaskOnFocus(currentValue: string): string {
  if (!currentValue.trim()) return '+7 (';
  return formatPhoneMask(currentValue);
}

export function phoneMaskOnChange(nextValue: string): string {
  const digits = extractPhoneDigits(nextValue);
  if (!digits) return '';
  return formatPhoneMask(nextValue);
}
