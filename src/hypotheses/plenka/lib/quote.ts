import {
  getSeries,
  skuPrice,
  skuTitle,
  tierByListTotal,
  type FilmColor,
  type PriceTierId,
  type Sku,
  SKUS,
} from "@/hypotheses/plenka/lib/catalog";

export type QuoteLine = {
  skuId: string;
  qty: number;
  color?: FilmColor;
  perforation?: string;
};

export type QuoteTotals = {
  listTotal: number;
  tier: PriceTierId;
  discountedTotal: number;
  saving: number;
  rolls: number;
  weightKg: number;
};

export function findSku(id: string): Sku | undefined {
  return SKUS.find((sku) => sku.id === id);
}

export function lineKey(line: QuoteLine) {
  return [line.skuId, line.color ?? "", line.perforation ?? ""].join("|");
}

export function summarizeQuote(lines: QuoteLine[]): QuoteTotals {
  const rolls = lines.reduce((sum, line) => sum + line.qty, 0);
  const listTotal = lines.reduce((sum, line) => {
    const sku = findSku(line.skuId);
    if (!sku) return sum;
    return sum + sku.prices.small * line.qty;
  }, 0);
  const tier = tierByListTotal(listTotal);
  const discountedTotal = lines.reduce((sum, line) => {
    const sku = findSku(line.skuId);
    if (!sku) return sum;
    return sum + skuPrice(sku, tier) * line.qty;
  }, 0);
  const weightKg = lines.reduce((sum, line) => {
    const sku = findSku(line.skuId);
    if (!sku) return sum;
    return sum + sku.weightKg * line.qty;
  }, 0);

  return {
    listTotal,
    tier,
    discountedTotal,
    saving: listTotal - discountedTotal,
    rolls,
    weightKg,
  };
}

export function formatQuoteMessage(
  lines: QuoteLine[],
  extras: { name: string; phone: string; email: string; comment: string }
) {
  const totals = summarizeQuote(lines);
  const items = lines
    .map((line) => {
      const sku = findSku(line.skuId);
      if (!sku) return null;
      const series = getSeries(sku.seriesId);
      const bits = [
        skuTitle(sku),
        series.colorLabel,
        line.color ? `цвет: ${line.color}` : null,
        line.perforation ? `перфорация ${line.perforation}` : null,
        `${line.qty} рул.`,
      ].filter(Boolean);
      return `• ${bits.join(", ")}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    "Запрос счёта на полиэтиленовую плёнку",
    extras.name && `Имя: ${extras.name}`,
    extras.phone && `Телефон: ${extras.phone}`,
    extras.email && `Почта: ${extras.email}`,
    "",
    items || "Позиции не выбраны — нужна консультация по подбору.",
    "",
    `Рулонов: ${totals.rolls}`,
    `Вес: ${totals.weightKg} кг`,
    `Сумма по прайсу 1–100: ${totals.listTotal} руб.`,
    extras.comment && `Комментарий: ${extras.comment}`,
  ]
    .filter((row) => row !== "")
    .join("\n");
}
