
import { Trash2 } from "lucide-react";
import { COLOR_META, formatMoney, formatWidth, getSeries, PRICE_TIERS } from "@/hypotheses/plenka/lib/catalog";
import { findSku, lineKey } from "@/hypotheses/plenka/lib/quote";
import { useQuote } from "@/hypotheses/plenka/components/quote-provider";
import { Button } from "@/hypotheses/plenka/components/ui/button";
import { Input } from "@/hypotheses/plenka/components/ui/input";

export function QuotePanel() {
  const { lines, totals, setQty, removeLine, clear, setInquiryOpen } = useQuote();
  const activeTier = PRICE_TIERS.find((tier) => tier.id === totals.tier);

  return (
    <aside
      id="podbor"
      className="rounded-2xl bg-black p-5 text-white shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">Подбор</p>
          <h2 className="font-heading mt-1 text-xl">Счёт по прайсу</h2>
        </div>
        {lines.length > 0 ? (
          <Button variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white" onClick={clear}>
            Сбросить
          </Button>
        ) : null}
      </div>

      {lines.length === 0 ? (
        <p className="mt-6 text-sm leading-6 text-white/65">
          Добавьте рулоны из прайса. Ступень скидки посчитается сама: по сумме
          заказа в колонке 1–100 тыс. ₽.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {lines.map((line) => {
            const sku = findSku(line.skuId);
            if (!sku) return null;
            const series = getSeries(sku.seriesId);
            return (
              <li
                key={lineKey(line)}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{series.shortName}</p>
                    <p className="text-xs text-white/55">
                      рукав {formatWidth(sku.sleeveWidthM)} · {sku.thicknessMkm} мкм · {sku.lengthM} м
                      {line.perforation ? ` · ${line.perforation}` : ""}
                      {line.color ? ` · ${COLOR_META[line.color].label.toLowerCase()}` : ""}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/50 hover:bg-white/10 hover:text-white"
                    onClick={() => removeLine(lineKey(line))}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <Input
                    type="number"
                    min={1}
                    value={line.qty}
                    className="h-8 w-20 border-white/15 bg-black text-white"
                    onChange={(event) =>
                      setQty(lineKey(line), Number(event.target.value) || 0)
                    }
                  />
                  <p className="text-sm">
                    {formatMoney(sku.prices[totals.tier] * line.qty)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-white/60">
          <dt>Рулонов / вес</dt>
          <dd>
            {totals.rolls} шт. · {String(totals.weightKg).replace(".", ",")} кг
          </dd>
        </div>
        <div className="flex justify-between text-white/60">
          <dt>Ступень</dt>
          <dd className="text-[var(--brand-yellow)]">{activeTier?.label}</dd>
        </div>
        {totals.saving > 0 ? (
          <div className="flex justify-between text-white/60">
            <dt>Экономия к базе</dt>
            <dd>{formatMoney(totals.saving)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between text-base font-semibold">
          <dt>К оплате</dt>
          <dd>{formatMoney(totals.discountedTotal)}</dd>
        </div>
      </dl>

      <Button
        className="mt-5 h-11 w-full bg-[var(--brand-yellow)] text-black hover:bg-[var(--brand-yellow)]/90"
        onClick={() => setInquiryOpen(true)}
      >
        Запросить счёт
      </Button>
    </aside>
  );
}
