export type CategoryId = "agro" | "tech" | "mulch";
export type SeriesId =
  | "agro-l-clear"
  | "agro-l-color"
  | "agrosvet-l"
  | "agrolux-l"
  | "st-clear"
  | "gost-clear"
  | "gost-black"
  | "mulch";

export type FilmColor =
  | "clear"
  | "green"
  | "turquoise"
  | "orange"
  | "blue"
  | "black";

export type PriceTierId = "small" | "mid" | "large";

export type Prices = Record<PriceTierId, number>;

export type Sku = {
  id: string;
  seriesId: SeriesId;
  sleeveWidthM: number;
  unfoldWidthM: number;
  thicknessMkm: number;
  lengthM: number;
  weightKg: number;
  prices: Prices;
  perforation?: string[];
};

export type Series = {
  id: SeriesId;
  slug: string;
  category: CategoryId;
  name: string;
  shortName: string;
  brand: string;
  seasons: string;
  colors: FilmColor[];
  colorLabel: string;
  rawMaterial: string;
  stabilization: string;
  summary: string;
  description: string;
  useCases: string[];
};

export const PRICE_DATE = "21.04.2026";

export const COMPANY = {
  name: "ООО «Вест Энтерпрайз»",
  site: "westenterprise.ru",
  email: "westenterprise@yandex.ru",
  infoEmail: "info@westenterprise.ru",
  phone800: "8 (800) 555-23-28",
  phone800Href: "tel:88005552328",
  phoneKrasnodar: "+7 (918) 041-54-54",
  phoneKrasnodarHref: "tel:+79180415454",
  whatsapp: "https://api.whatsapp.com/send/?phone=79180415454",
  telegram: "https://t.me/WestEnterprise",
  max: "https://max.ru/u/f9LHodD0cOJaJLZO6Uqy2e8HIrFoOaOrkXzD52yon0WPnzkO316PXTTauMU",
  address:
    "Краснодарский край, Республика Адыгея, Тахтамукайский район, х. Новый сад, ул. Южный обход, 8",
};

export const PRICE_TIERS: {
  id: PriceTierId;
  label: string;
  hint: string;
  min: number;
  max: number | null;
}[] = [
  {
    id: "small",
    label: "1–100 тыс. ₽",
    hint: "базовая цена рулона",
    min: 0,
    max: 100_000,
  },
  {
    id: "mid",
    label: "100–300 тыс. ₽",
    hint: "примерно −7% к базовой",
    min: 100_000,
    max: 300_000,
  },
  {
    id: "large",
    label: "свыше 300 тыс. ₽",
    hint: "примерно −14% к базовой",
    min: 300_000,
    max: null,
  },
];

export const COLOR_META: Record<
  FilmColor,
  { label: string; swatch: string; text: string }
> = {
  clear: { label: "Прозрачная", swatch: "#d7eefc", text: "#16324a" },
  green: { label: "Зелёная", swatch: "#2f6b3a", text: "#ffffff" },
  turquoise: { label: "Бирюзовая", swatch: "#1a8f8a", text: "#ffffff" },
  orange: { label: "Оранжевая", swatch: "#e07a2f", text: "#ffffff" },
  blue: { label: "Голубая", swatch: "#3d7ec9", text: "#ffffff" },
  black: { label: "Чёрная", swatch: "#1a1a1a", text: "#ffffff" },
};

export const CATEGORIES: {
  id: CategoryId;
  title: string;
  lead: string;
}[] = [
  {
    id: "agro",
    title: "Агроплёнка",
    lead: "Усиленные тепличные рукава на 1, 3 и 5 сезонов со свето- и термостабилизацией.",
  },
  {
    id: "tech",
    title: "Техническая плёнка",
    lead: "Первичное сырьё: марка СТ и ГОСТ, прозрачная и чёрная, от 25 до 200 мкм.",
  },
  {
    id: "mulch",
    title: "Мульча для клубники",
    lead: "Чёрная перфорированная плёнка 1,3 м и изготовление под шаг посадки.",
  },
];

export const SERIES: Series[] = [
  {
    id: "agro-l-clear",
    slug: "agro-l-prozrachnaya",
    category: "agro",
    name: "АГРО-L усиленная прозрачная",
    shortName: "АГРО-L",
    brand: "АГРО-L",
    seasons: "1 сезон",
    colors: ["clear"],
    colorLabel: "прозрачная",
    rawMaterial: "полиэтилен с светостабилизатором",
    stabilization: "светостабилизатор",
    summary:
      "Сезонная тепличная плёнка для весенних теплиц и каркасных укрытий. Высокое светопропускание, усиленный рукав.",
    description:
      "Однолетняя усиленная плёнка АГРО-L закрывает весенние теплицы, тоннели и бескаркасные укрытия. В рецептуру добавлен светостабилизатор, поэтому полотно держит сезон на солнце Юга России. Рукав 2 и 3 м разворачивается на 4 и 6 м — удобно кроить под типовые каркасы.",
    useCases: [
      "Весенние теплицы и парники",
      "Каркасные и бескаркасные укрытия",
      "Сезонное выращивание овощей",
    ],
  },
  {
    id: "agro-l-color",
    slug: "agro-l-cvetnaya",
    category: "agro",
    name: "АГРО-L усиленная цветная",
    shortName: "АГРО-L цвет",
    brand: "АГРО-L",
    seasons: "1 сезон",
    colors: ["green", "turquoise", "orange"],
    colorLabel: "зелёная / бирюзовая / оранжевая",
    rawMaterial: "полиэтилен с светостабилизатором",
    stabilization: "светостабилизатор",
    summary:
      "Та же однолетняя усиленная серия, но с окраской: зелёная, бирюзовая или оранжевая — на выбор при заказе.",
    description:
      "Цветная АГРО-L работает как сезонная тепличная плёнка и дополнительно притеняет посадки. Зелёный, бирюзовый и оранжевый рукава идут по одной цене. Ширина от 1,5 м (разворот 3 м) до 3 м (разворот 6 м).",
    useCases: [
      "Теплицы, где нужно смягчить прямой свет",
      "Укрытия с визуальной маркировкой рядов",
      "Сезонное овощеводство",
    ],
  },
  {
    id: "agrosvet-l",
    slug: "agrosvet-l",
    category: "agro",
    name: "АГРОСВЕТ-L усиленная зелёная",
    shortName: "АГРОСВЕТ-L",
    brand: "АГРОСВЕТ-L",
    seasons: "3 сезона",
    colors: ["green"],
    colorLabel: "зелёная",
    rawMaterial: "полиэтилен термо- и светостабилизированный",
    stabilization: "термо- и светостабилизация",
    summary:
      "Трёхлетняя зелёная плёнка с термо- и светостабилизацией — меньше перегрев, дольше служит каркас.",
    description:
      "АГРОСВЕТ-L рассчитана на три сезона. Зелёное полотно и двойная стабилизация снижают пиковый нагрев в теплице и удерживают механику рукава. Есть узкий метр (разворот 2 м) для тоннелей и широкий 3 м (разворот 6 м).",
    useCases: [
      "Многолетние плёночные теплицы",
      "Южные регионы с жёстким солнцем",
      "Овощные и цветочные хозяйства",
    ],
  },
  {
    id: "agrolux-l",
    slug: "agrolux-l",
    category: "agro",
    name: "АГРОЛЮКС-L усиленная голубая",
    shortName: "АГРОЛЮКС-L",
    brand: "АГРОЛЮКС-L",
    seasons: "5 сезонов",
    colors: ["blue"],
    colorLabel: "голубая",
    rawMaterial: "полиэтилен термо- и светостабилизированный",
    stabilization: "термо- и светостабилизация",
    summary:
      "Пятилетняя голубая тепличная плёнка. Самый долгий срок в прайсе, толщины до 180 мкм.",
    description:
      "АГРОЛЮКС-L — верхняя агросерия завода: пять сезонов, голубой цвет, термо- и светостабилизация. Рукав 1,5 / 2 / 3 м, на широком рукаве есть намотка 50 и 100 м и толщина 180 мкм для ветровых участков.",
    useCases: [
      "Капитальные плёночные теплицы",
      "Хозяйства, которые не хотят перетягивать каркас каждый год",
      "Ветреные открытые площадки",
    ],
  },
  {
    id: "st-clear",
    slug: "plenka-st",
    category: "tech",
    name: "Плёнка 1 сорт, марка СТ",
    shortName: "СТ 1 сорт",
    brand: "СТ",
    seasons: "техническая",
    colors: ["clear"],
    colorLabel: "прозрачная",
    rawMaterial: "первичное сырьё",
    stabilization: "без агростабилизации",
    summary:
      "Прозрачная техническая плёнка первого сорта. Рукав 1,5 м, толщины от 40 до 200 мкм.",
    description:
      "Марка СТ — рабочая прозрачная плёнка из первичного сырья: упаковка, временные укрытия, строительные контуры. Рукав 1,5 м (разворот 3 м). Тонкие позиции идут в намотке 200 м, основные толщины — по 100 м.",
    useCases: [
      "Упаковка и паллетирование",
      "Временная гидроизоляция",
      "Строительные укрытия",
    ],
  },
  {
    id: "gost-clear",
    slug: "plenka-gost-prozrachnaya",
    category: "tech",
    name: "Плёнка ГОСТ прозрачная",
    shortName: "ГОСТ прозрачная",
    brand: "ГОСТ",
    seasons: "техническая",
    colors: ["clear"],
    colorLabel: "прозрачная",
    rawMaterial: "первичное сырьё",
    stabilization: "без агростабилизации",
    summary:
      "Прозрачная плёнка по ГОСТ из первичного сырья. Рукава 1 и 1,5 м, толщины от 25 до 200 мкм.",
    description:
      "ГОСТ-плёнка закрывает упаковку, стройку и хозяйственные нужды, где нужна предсказуемая толщина и первичное сырьё. Узкий рукав 1 м (разворот 2 м) и основной 1,5 м (разворот 3 м). Есть намотки 80, 100 и 200 м.",
    useCases: [
      "Упаковка продукции",
      "Строительство и ремонт",
      "Сельхоздворы и склады",
    ],
  },
  {
    id: "gost-black",
    slug: "plenka-gost-chernaya",
    category: "tech",
    name: "Плёнка ГОСТ чёрная",
    shortName: "ГОСТ чёрная",
    brand: "ГОСТ",
    seasons: "техническая",
    colors: ["black"],
    colorLabel: "чёрная",
    rawMaterial: "первичное сырьё",
    stabilization: "светонепроницаемая",
    summary:
      "Чёрная ГОСТ-плёнка 1,5 м. Мульчирование без перфорации, укрытие силосных ям, строительные контуры.",
    description:
      "Непрозрачный рукав из первичного сырья. Толщины 70–170 мкм, намотка 100 м, разворот 3 м. Подходит там, где нужна светонепроницаемость без готовых отверстий под рассаду.",
    useCases: [
      "Мульчирование без перфорации",
      "Силос и бурт",
      "Светоизоляция и стройка",
    ],
  },
  {
    id: "mulch",
    slug: "mulcha-klubnika",
    category: "mulch",
    name: "Мульча чёрная для клубники",
    shortName: "Мульча",
    brand: "Мульча",
    seasons: "сезон посадки",
    colors: ["black"],
    colorLabel: "чёрная, с перфорацией",
    rawMaterial: "первичное сырьё",
    stabilization: "светонепроницаемая",
    summary:
      "Готовые рулоны 1,3 м с перфорацией 25×25 или 30×30 см. Под заказ — шаг и ширина от 30 рулонов.",
    description:
      "Чёрная мульчирующая плёнка с отверстиями под клубнику. В прайсе — ширина 1,3 м, толщины 60 и 80 мкм, намотка 400 и 500 м. Перфорация 25×25 или 30×30 см в одной цене. От 30 рулонов завод делает индивидуальный шаг и ширину полотна 1000–1300 мм.",
    useCases: [
      "Клубника в открытом грунте",
      "Ягодные ряды с фиксированным шагом",
      "Подавление сорняка и прогрев почвы",
    ],
  },
];

type SkuDraft = {
  sleeveWidthM: number;
  unfoldWidthM: number;
  thicknessMkm: number;
  lengthM: number;
  weightKg: number;
  small: number;
  mid: number;
  large: number;
  perforation?: string[];
};

function makeSkus(seriesId: SeriesId, rows: SkuDraft[]): Sku[] {
  return rows.map((row) => ({
    id: [
      seriesId,
      String(row.sleeveWidthM).replace(".", "-"),
      row.thicknessMkm,
      row.lengthM,
      row.perforation?.[0]?.replace("×", "x") ?? "",
    ]
      .filter(Boolean)
      .join("-"),
    seriesId,
    sleeveWidthM: row.sleeveWidthM,
    unfoldWidthM: row.unfoldWidthM,
    thicknessMkm: row.thicknessMkm,
    lengthM: row.lengthM,
    weightKg: row.weightKg,
    prices: { small: row.small, mid: row.mid, large: row.large },
    perforation: row.perforation,
  }));
}

export const SKUS: Sku[] = [
  ...makeSkus("agro-l-clear", [
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 80, lengthM: 100, weightKg: 25, small: 5500, mid: 5125, large: 4750 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 100, lengthM: 100, weightKg: 33, small: 7260, mid: 6765, large: 6270 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 120, lengthM: 100, weightKg: 40, small: 8800, mid: 8200, large: 7600 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 150, lengthM: 70, weightKg: 35, small: 7700, mid: 7175, large: 6650 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 80, lengthM: 50, weightKg: 20, small: 4400, mid: 4100, large: 3800 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 100, lengthM: 50, weightKg: 25, small: 5500, mid: 5125, large: 4750 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 50, weightKg: 30, small: 6600, mid: 6150, large: 5700 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 150, lengthM: 50, weightKg: 38, small: 8360, mid: 7790, large: 7220 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 80, lengthM: 100, weightKg: 40, small: 8800, mid: 8200, large: 7600 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 100, lengthM: 100, weightKg: 50, small: 11000, mid: 10250, large: 9500 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 100, weightKg: 60, small: 13200, mid: 12300, large: 11400 },
  ]),
  ...makeSkus("agro-l-color", [
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 100, lengthM: 100, weightKg: 24, small: 5328, mid: 4968, large: 4632 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 29, small: 6438, mid: 6003, large: 5597 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 100, lengthM: 100, weightKg: 33, small: 7326, mid: 6831, large: 6369 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 120, lengthM: 100, weightKg: 40, small: 8880, mid: 8280, large: 7720 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 100, lengthM: 50, weightKg: 25, small: 5550, mid: 5175, large: 4825 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 50, weightKg: 30, small: 6660, mid: 6210, large: 5790 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 150, lengthM: 50, weightKg: 38, small: 8436, mid: 7866, large: 7334 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 100, lengthM: 100, weightKg: 50, small: 11100, mid: 10350, large: 9650 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 100, weightKg: 60, small: 13320, mid: 12420, large: 11580 },
  ]),
  ...makeSkus("agrosvet-l", [
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 120, lengthM: 100, weightKg: 19, small: 4465, mid: 4275, large: 4085 },
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 150, lengthM: 100, weightKg: 24, small: 5640, mid: 5400, large: 5160 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 30, small: 7050, mid: 6750, large: 6450 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 140, lengthM: 100, weightKg: 35, small: 8225, mid: 7875, large: 7525 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 50, weightKg: 31, small: 7285, mid: 6975, large: 6665 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 150, lengthM: 50, weightKg: 38, small: 8930, mid: 8550, large: 8170 },
  ]),
  ...makeSkus("agrolux-l", [
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 30, small: 7350, mid: 7050, large: 6750 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 140, lengthM: 100, weightKg: 35, small: 8575, mid: 8225, large: 7875 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 120, lengthM: 100, weightKg: 40, small: 9800, mid: 9400, large: 9000 },
    { sleeveWidthM: 2, unfoldWidthM: 4, thicknessMkm: 150, lengthM: 100, weightKg: 50, small: 12250, mid: 11750, large: 11250 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 50, weightKg: 31, small: 7595, mid: 7285, large: 6975 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 150, lengthM: 50, weightKg: 38, small: 9310, mid: 8930, large: 8550 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 180, lengthM: 50, weightKg: 46, small: 11270, mid: 10810, large: 10350 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 120, lengthM: 100, weightKg: 62, small: 15190, mid: 14570, large: 13950 },
    { sleeveWidthM: 3, unfoldWidthM: 6, thicknessMkm: 150, lengthM: 100, weightKg: 76, small: 18620, mid: 17860, large: 17100 },
  ]),
  ...makeSkus("st-clear", [
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 40, lengthM: 200, weightKg: 12, small: 2280, mid: 2160, large: 2040 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 50, lengthM: 200, weightKg: 14, small: 2660, mid: 2520, large: 2380 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 60, lengthM: 100, weightKg: 10, small: 1900, mid: 1800, large: 1700 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 70, lengthM: 100, weightKg: 11.5, small: 2185, mid: 2070, large: 1955 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 80, lengthM: 100, weightKg: 14, small: 2660, mid: 2520, large: 2380 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 90, lengthM: 100, weightKg: 15, small: 2850, mid: 2700, large: 2550 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 100, lengthM: 100, weightKg: 18, small: 3420, mid: 3240, large: 3060 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 21, small: 3990, mid: 3780, large: 3570 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 140, lengthM: 100, weightKg: 24, small: 4560, mid: 4320, large: 4080 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 150, lengthM: 100, weightKg: 26, small: 4940, mid: 4680, large: 4420 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 200, lengthM: 100, weightKg: 35, small: 6650, mid: 6300, large: 5950 },
  ]),
  ...makeSkus("gost-clear", [
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 60, lengthM: 100, weightKg: 10, small: 1900, mid: 1800, large: 1700 },
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 80, lengthM: 100, weightKg: 13, small: 2470, mid: 2340, large: 2210 },
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 100, lengthM: 100, weightKg: 16, small: 3040, mid: 2880, large: 2720 },
    { sleeveWidthM: 1, unfoldWidthM: 2, thicknessMkm: 120, lengthM: 100, weightKg: 19, small: 3610, mid: 3420, large: 3230 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 25, lengthM: 100, weightKg: 6, small: 1230, mid: 1080, large: 1020 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 30, lengthM: 100, weightKg: 7, small: 1435, mid: 1260, large: 1190 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 40, lengthM: 100, weightKg: 9, small: 1800, mid: 1620, large: 1530 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 50, lengthM: 100, weightKg: 11, small: 2200, mid: 1980, large: 1870 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 60, lengthM: 100, weightKg: 13, small: 2470, mid: 2340, large: 2210 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 70, lengthM: 100, weightKg: 16, small: 3040, mid: 2880, large: 2720 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 80, lengthM: 100, weightKg: 19, small: 3610, mid: 3420, large: 3230 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 90, lengthM: 100, weightKg: 22, small: 4180, mid: 3960, large: 3740 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 100, lengthM: 100, weightKg: 24, small: 4560, mid: 4320, large: 4080 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 29, small: 5510, mid: 5220, large: 4930 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 140, lengthM: 100, weightKg: 33, small: 6270, mid: 5940, large: 5610 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 150, lengthM: 100, weightKg: 36, small: 6840, mid: 6480, large: 6120 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 170, lengthM: 100, weightKg: 40, small: 7600, mid: 7200, large: 6800 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 40, lengthM: 200, weightKg: 18, small: 3600, mid: 3240, large: 3060 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 50, lengthM: 200, weightKg: 22, small: 4400, mid: 3960, large: 3740 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 200, lengthM: 80, weightKg: 38, small: 7220, mid: 6840, large: 6460 },
  ]),
  ...makeSkus("gost-black", [
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 70, lengthM: 100, weightKg: 16, small: 3360, mid: 3200, large: 3040 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 80, lengthM: 100, weightKg: 19, small: 3990, mid: 3800, large: 3610 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 100, lengthM: 100, weightKg: 24, small: 5040, mid: 4800, large: 4560 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 120, lengthM: 100, weightKg: 29, small: 6090, mid: 5800, large: 5510 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 140, lengthM: 100, weightKg: 33, small: 6930, mid: 6600, large: 6270 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 150, lengthM: 100, weightKg: 36, small: 7560, mid: 7200, large: 6840 },
    { sleeveWidthM: 1.5, unfoldWidthM: 3, thicknessMkm: 170, lengthM: 100, weightKg: 40, small: 8400, mid: 8000, large: 7600 },
  ]),
  ...makeSkus("mulch", [
    {
      sleeveWidthM: 1.3,
      unfoldWidthM: 1.3,
      thicknessMkm: 60,
      lengthM: 400,
      weightKg: 21,
      small: 5880,
      mid: 5565,
      large: 5250,
      perforation: ["25×25 см", "30×30 см"],
    },
    {
      sleeveWidthM: 1.3,
      unfoldWidthM: 1.3,
      thicknessMkm: 60,
      lengthM: 500,
      weightKg: 26,
      small: 7280,
      mid: 6890,
      large: 6500,
      perforation: ["25×25 см", "30×30 см"],
    },
    {
      sleeveWidthM: 1.3,
      unfoldWidthM: 1.3,
      thicknessMkm: 80,
      lengthM: 400,
      weightKg: 28,
      small: 7840,
      mid: 7420,
      large: 7000,
      perforation: ["25×25 см", "30×30 см"],
    },
    {
      sleeveWidthM: 1.3,
      unfoldWidthM: 1.3,
      thicknessMkm: 80,
      lengthM: 500,
      weightKg: 35,
      small: 9800,
      mid: 9275,
      large: 8750,
      perforation: ["25×25 см", "30×30 см"],
    },
  ]),
];

export const CUSTOM_MULCH = {
  minRolls: 30,
  widthRange: "1000–1300 мм",
  singleRow: ["15 см", "25 см", "30 см", "35 см"],
  doubleRow: [
    "25 × 15 см",
    "25 × 30 см",
    "25 × 35 см",
    "30 × 15 см",
    "30 × 25 см",
    "30 × 35 см",
  ],
};

export function getSeries(id: SeriesId) {
  const series = SERIES.find((item) => item.id === id);
  if (!series) throw new Error(`Unknown series ${id}`);
  return series;
}

export function getSeriesBySlug(slug: string) {
  return SERIES.find((item) => item.slug === slug) ?? null;
}

export function skusForSeries(id: SeriesId) {
  return SKUS.filter((sku) => sku.seriesId === id);
}

export function uniqueSorted(values: number[]) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

export function skuTitle(sku: Sku) {
  const series = getSeries(sku.seriesId);
  return `${series.shortName} ${formatWidth(sku.sleeveWidthM)} · ${sku.thicknessMkm} мкм · ${sku.lengthM} м`;
}

export function formatWidth(meters: number) {
  return `${String(meters).replace(".", ",")} м`;
}

export function formatKg(kg: number) {
  return `${String(kg).replace(".", ",")} кг`;
}

export function formatMoney(value: number) {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

export function tierByListTotal(listTotal: number): PriceTierId {
  if (listTotal >= 300_000) return "large";
  if (listTotal >= 100_000) return "mid";
  return "small";
}

export function skuPrice(sku: Sku, tier: PriceTierId) {
  return sku.prices[tier];
}
