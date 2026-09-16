
import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { plenkaPath } from "@/hypotheses/plenka/paths";
import { FilterX, Plus } from "lucide-react";
import {
  CATEGORIES,
  COLOR_META,
  formatKg,
  formatMoney,
  formatWidth,
  getSeries,
  PRICE_TIERS,
  SERIES,
  SKUS,
  uniqueSorted,
  type CategoryId,
  type FilmColor,
  type SeriesId,
  type Sku,
} from "@/hypotheses/plenka/lib/catalog";
import { Button } from "@/hypotheses/plenka/components/ui/button";
import { Input } from "@/hypotheses/plenka/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/hypotheses/plenka/components/ui/select";
import { useQuote } from "@/hypotheses/plenka/components/quote-provider";
import { ColorDots } from "@/hypotheses/plenka/components/film-swatch";

const ALL = "all";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 rounded-full border px-3 text-sm transition ${
        active
          ? "border-black bg-black text-white"
          : "border-black/10 bg-white text-foreground hover:border-black/30"
      }`}
    >
      {children}
    </button>
  );
}

function SkuActions({ sku }: { sku: Sku }) {
  const series = getSeries(sku.seriesId);
  const { addLine } = useQuote();
  const [color, setColor] = useState<FilmColor>(series.colors[0]);
  const [hole, setHole] = useState(sku.perforation?.[0] ?? "");

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {series.colors.length > 1 ? (
        <Select value={color} onValueChange={(value) => setColor(value as FilmColor)}>
          <SelectTrigger className="min-w-36 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {series.colors.map((item) => (
              <SelectItem key={item} value={item}>
                {COLOR_META[item].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      {sku.perforation ? (
        <Select value={hole} onValueChange={(value) => setHole(String(value))}>
          <SelectTrigger className="min-w-36 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sku.perforation.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      <Button
        className="h-9 shrink-0 px-3 whitespace-nowrap"
        onClick={() =>
          addLine({
            skuId: sku.id,
            color: series.colors.length > 1 ? color : undefined,
            perforation: hole || undefined,
          })
        }
      >
        <Plus data-icon="inline-start" />
        В подбор
      </Button>
    </div>
  );
}

export function CatalogExplorer({
  initialSeriesId,
}: {
  initialSeriesId?: SeriesId;
}) {
  const initialSeries = initialSeriesId ? getSeries(initialSeriesId) : null;
  const [category, setCategory] = useState<CategoryId | typeof ALL>(
    initialSeries?.category ?? ALL
  );
  const [seriesId, setSeriesId] = useState<SeriesId | typeof ALL>(
    initialSeriesId ?? ALL
  );
  const [width, setWidth] = useState<number | typeof ALL>(ALL);
  const [thickness, setThickness] = useState<number | typeof ALL>(ALL);
  const [query, setQuery] = useState("");

  const scopedSeries = useMemo(
    () =>
      SERIES.filter((item) => category === ALL || item.category === category),
    [category]
  );

  const scopedSkus = useMemo(() => {
    const ids = new Set(scopedSeries.map((item) => item.id));
    return SKUS.filter((sku) => ids.has(sku.seriesId));
  }, [scopedSeries]);

  const widths = uniqueSorted(scopedSkus.map((sku) => sku.sleeveWidthM));
  const thicknesses = uniqueSorted(scopedSkus.map((sku) => sku.thicknessMkm));

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return scopedSkus.filter((sku) => {
      if (seriesId !== ALL && sku.seriesId !== seriesId) return false;
      if (width !== ALL && sku.sleeveWidthM !== width) return false;
      if (thickness !== ALL && sku.thicknessMkm !== thickness) return false;
      if (!needle) return true;
      const series = getSeries(sku.seriesId);
      const hay = [
        series.name,
        series.brand,
        series.colorLabel,
        series.seasons,
        `${sku.thicknessMkm}`,
        formatWidth(sku.sleeveWidthM),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [scopedSkus, seriesId, width, thickness, query]);

  const hasFilters =
    category !== ALL ||
    seriesId !== ALL ||
    width !== ALL ||
    thickness !== ALL ||
    query.trim().length > 0;

  function reset() {
    setCategory(initialSeries?.category ?? ALL);
    setSeriesId(initialSeriesId ?? ALL);
    setWidth(ALL);
    setThickness(ALL);
    setQuery("");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Chip
          active={category === ALL}
          onClick={() => {
            setCategory(ALL);
            setSeriesId(ALL);
            setWidth(ALL);
            setThickness(ALL);
          }}
        >
          Все {SKUS.length} поз.
        </Chip>
        {CATEGORIES.map((item) => (
          <Chip
            key={item.id}
            active={category === item.id}
            onClick={() => {
              setCategory(item.id);
              setSeriesId(ALL);
              setWidth(ALL);
              setThickness(ALL);
            }}
          >
            {item.title}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {scopedSeries.map((item) => (
          <Chip
            key={item.id}
            active={seriesId === item.id}
            onClick={() => setSeriesId(seriesId === item.id ? ALL : item.id)}
          >
            <span className="inline-flex items-center gap-2">
              <ColorDots colors={item.colors} />
              {item.shortName}
            </span>
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {widths.map((value) => (
            <Chip
              key={value}
              active={width === value}
              onClick={() => setWidth(width === value ? ALL : value)}
            >
              рукав {formatWidth(value)}
            </Chip>
          ))}
        </div>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск: ГОСТ, 120 мкм, голубая…"
          className="h-10 bg-white lg:max-w-xs"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {thicknesses.map((value) => (
          <Chip
            key={value}
            active={thickness === value}
            onClick={() => setThickness(thickness === value ? ALL : value)}
          >
            {value} мкм
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-muted-foreground">
          Показано {rows.length} {rows.length === 1 ? "позиция" : "позиций"}. Цены
          за рулон, прайс от 21.04.2026.
        </p>
        {hasFilters ? (
          <Button variant="ghost" onClick={reset}>
            <FilterX data-icon="inline-start" />
            Сбросить фильтры
          </Button>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-14 text-center">
          <p className="font-heading text-lg">Такой комбинации в прайсе нет</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Завод режет нестандарт под заказ. Снимите фильтр или оставьте задачу
            менеджеру — от 30 рулонов мульчи делают свой шаг перфорации.
          </p>
          <Button className="mt-5 h-10 px-4" onClick={reset}>
            Показать весь прайс
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-black/10 bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium">Серия</th>
                    <th className="px-3 py-3 font-medium">Рукав</th>
                    <th className="px-3 py-3 font-medium">Разворот</th>
                    <th className="px-3 py-3 font-medium">Мкм</th>
                    <th className="px-3 py-3 font-medium">М.п.</th>
                    <th className="px-3 py-3 font-medium">Кг</th>
                    {PRICE_TIERS.map((tier) => (
                      <th key={tier.id} className="px-3 py-3 font-medium">
                        {tier.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((sku) => {
                    const series = getSeries(sku.seriesId);
                    return (
                      <tr key={sku.id} className="border-t border-black/8 hover:bg-[#f6f3ea]/70">
                        <td className="px-4 py-3">
                          <Link to={plenkaPath(`/serii/${series.slug}`)} className="font-medium hover:underline">
                            {series.shortName}
                          </Link>
                          <p className="text-xs text-muted-foreground">{series.seasons}</p>
                        </td>
                        <td className="px-3 py-3">{formatWidth(sku.sleeveWidthM)}</td>
                        <td className="px-3 py-3">{formatWidth(sku.unfoldWidthM)}</td>
                        <td className="px-3 py-3">{sku.thicknessMkm}</td>
                        <td className="px-3 py-3">{sku.lengthM}</td>
                        <td className="px-3 py-3">{formatKg(sku.weightKg)}</td>
                        <td className="px-3 py-3 tabular-nums">{formatMoney(sku.prices.small)}</td>
                        <td className="px-3 py-3 tabular-nums text-muted-foreground">
                          {formatMoney(sku.prices.mid)}
                        </td>
                        <td className="px-3 py-3 tabular-nums text-muted-foreground">
                          {formatMoney(sku.prices.large)}
                        </td>
                        <td className="px-4 py-3">
                          <SkuActions sku={sku} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {rows.map((sku) => {
              const series = getSeries(sku.seriesId);
              return (
                <article key={sku.id} className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={plenkaPath(`/serii/${series.slug}`)} className="font-heading font-medium">
                        {series.shortName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        рукав {formatWidth(sku.sleeveWidthM)} → {formatWidth(sku.unfoldWidthM)} · {sku.thicknessMkm} мкм · {sku.lengthM} м · {formatKg(sku.weightKg)}
                      </p>
                    </div>
                    <p className="text-base font-semibold">{formatMoney(sku.prices.small)}</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    100–300 тыс.: {formatMoney(sku.prices.mid)} · свыше 300: {formatMoney(sku.prices.large)}
                  </p>
                  <div className="mt-3">
                    <SkuActions sku={sku} />
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
