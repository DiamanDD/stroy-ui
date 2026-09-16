export const SITE = {
  name: 'СТРОЙМАРКЕТ',
  namePrimary: 'СТРОЙ',
  nameAccent: 'МАРКЕТ',
  title: 'СТРОЙМАРКЕТ — стройматериалы и инструменты',
  tagline: 'Строительные материалы, инструменты и всё необходимое для ремонта — в одном месте.',
  description:
    'Строительные материалы, инструменты и всё для ремонта. Быстрая помощь в подборе и доставка по региону.',
  copyrightYear: 2026,
} as const;

export const CONTACT = {
  phone: '+7 (86146) 4-41-71',
  phoneHref: 'tel:+78614644171',
  phonePlaceholder: '+7 (___) ___-__-__',
  email: 'info@stroymarket.ru',
  emailHref: 'mailto:info@stroymarket.ru',
} as const;

export const LOCATION = {
  region: 'Краснодарский край',
  city: 'г. Горячий Ключ',
  full: 'Краснодарский край, г. Горячий Ключ',
} as const;

export const WORKING_HOURS = [
  { days: 'Понедельник–пятница', hours: '8:00–19:00' },
  { days: 'Суббота', hours: '8:00–19:00' },
  { days: 'Воскресенье', hours: '8:00–19:00' },
] as const;

export const WORKING_DAYS_PER_WEEK = 7;

export const CALLBACK = {
  minutes: 15,
  promise: 'Перезвоним в течение 15 минут',
  successMessage: 'Мы перезвоним вам в течение 15 минут в рабочее время.',
} as const;

export const STATS = {
  productCount: '1000+',
  productCountLabel: 'наименований',
  workingDaysLabel: 'в неделю',
} as const;
