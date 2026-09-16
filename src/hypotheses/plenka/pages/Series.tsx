import { Link, Navigate, useParams } from 'react-router';
import { CatalogExplorer } from '@/hypotheses/plenka/components/catalog-explorer';
import { ColorDots, FilmSwatch } from '@/hypotheses/plenka/components/film-swatch';
import { QuotePanel } from '@/hypotheses/plenka/components/quote-panel';
import { buttonVariants } from '@/hypotheses/plenka/components/ui/button';
import { cn } from '@/hypotheses/plenka/lib/utils';
import {
  CUSTOM_MULCH,
  formatWidth,
  getSeriesBySlug,
  SERIES,
  SKUS,
  skusForSeries,
  uniqueSorted,
} from '@/hypotheses/plenka/lib/catalog';
import { plenkaPath } from '@/hypotheses/plenka/paths';

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const series = slug ? getSeriesBySlug(slug) : undefined;

  if (!series) {
    return <Navigate to={plenkaPath()} replace />;
  }

  const skus = skusForSeries(series.id);
  const widths = uniqueSorted(skus.map((sku) => sku.sleeveWidthM));
  const thicknesses = uniqueSorted(skus.map((sku) => sku.thicknessMkm));
  const related = SERIES.filter(
    (item) => item.category === series.category && item.id !== series.id,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link to={plenkaPath()} className="hover:text-foreground">
          Плёнка
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{series.shortName}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {series.seasons} · {series.stabilization}
          </p>
          <h1 className="font-heading mt-2 text-4xl leading-tight sm:text-5xl">
            {series.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {series.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {series.useCases.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
              >
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
              <dt className="text-muted-foreground">Рукав</dt>
              <dd className="mt-1 font-medium">{widths.map(formatWidth).join(', ')}</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
              <dt className="text-muted-foreground">Толщина</dt>
              <dd className="mt-1 font-medium">{thicknesses.join('–')} мкм</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
              <dt className="text-muted-foreground">Позиций</dt>
              <dd className="mt-1 font-medium">{skus.length}</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
              <dt className="text-muted-foreground">Цвет</dt>
              <dd className="mt-1 inline-flex items-center gap-2 font-medium">
                <ColorDots colors={series.colors} />
                {series.colorLabel}
              </dd>
            </div>
          </dl>
        </div>
        <FilmSwatch colors={series.colors} className="min-h-56 bg-[#ece7db] lg:min-h-full" />
      </div>

      {series.id === 'mulch' ? (
        <section className="mt-12 rounded-2xl bg-black p-6 text-white sm:p-8">
          <h2 className="font-heading text-2xl">Перфорация под заказ</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            Готовые рулоны в прайсе — ширина 1,3 м, отверстия 25×25 или 30×30 см. От{' '}
            {CUSTOM_MULCH.minRolls} рулонов делаем свой шаг: ширина полотна {CUSTOM_MULCH.widthRange},
            однорядная или двухрядная перфорация, своя длина намотки.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.16em] text-white/45 uppercase">Один ряд</p>
              <p className="mt-2 text-sm">{CUSTOM_MULCH.singleRow.join(' · ')}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-white/45 uppercase">
                Два ряда, ширина × длина
              </p>
              <p className="mt-2 text-sm">{CUSTOM_MULCH.doubleRow.join(' · ')}</p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h2 className="font-heading text-2xl">Позиции серии</h2>
          <p className="mt-2 mb-6 text-sm text-muted-foreground">
            {skus.length} из {SKUS.length} позиций общего прайса. Добавьте рулоны в подбор — скидка
            посчитается по сумме заказа.
          </p>
          <CatalogExplorer initialSeriesId={series.id} />
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <QuotePanel />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-heading text-2xl">Рядом в этой группе</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.id}
                to={plenkaPath(`/serii/${item.slug}`)}
                className="rounded-2xl bg-white p-5 ring-1 ring-black/10 transition hover:ring-black/25"
              >
                <p className="text-xs text-muted-foreground">{item.seasons}</p>
                <p className="font-heading mt-1 text-lg">{item.shortName}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-12">
        <Link
          to={plenkaPath('/#katalog')}
          className={cn(buttonVariants({ variant: 'outline' }), 'h-10 px-4')}
        >
          Ко всему прайсу
        </Link>
      </div>
    </div>
  );
}
