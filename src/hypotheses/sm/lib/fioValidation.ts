const CYRILLIC_LETTERS = 'А-Яа-яЁё';
const ALLOWED_INPUT_PATTERN = new RegExp(`^[${CYRILLIC_LETTERS}\\s-]*$`);

export const FIO_MIN_PARTS = 2;
export const FIO_MAX_PARTS = 3;
export const FIO_MAX_TOTAL_LENGTH = 100;

export function sanitizeFioInput(value: string): string {
  return value.replace(new RegExp(`[^${CYRILLIC_LETTERS}\\s-]`, 'g'), '');
}

export function capitalizeFioPart(part: string): string {
  return part
    .split('-')
    .map((segment) => {
      const lower = segment.toLowerCase();
      if (!lower) return '';
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('-');
}

export function normalizeFio(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(capitalizeFioPart)
    .join(' ');
}

export function validateFio(value: string): string | null {
  const normalized = normalizeFio(value);

  if (!normalized) {
    return 'Введите имя и отчество';
  }

  if (!ALLOWED_INPUT_PATTERN.test(normalized)) {
    return 'Используйте только русские буквы';
  }

  const parts = normalized.split(' ');

  if (parts.length < FIO_MIN_PARTS) {
    return 'Укажите минимум имя и отчество';
  }

  if (parts.length > FIO_MAX_PARTS) {
    return 'Не более трёх частей: фамилия, имя, отчество';
  }

  if (normalized.length > FIO_MAX_TOTAL_LENGTH) {
    return 'Слишком длинное значение';
  }

  return null;
}
