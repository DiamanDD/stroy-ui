import { Link } from "react-router";
import { plenkaPath } from "@/hypotheses/plenka/paths";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, SERIES, skusForSeries } from "@/hypotheses/plenka/lib/catalog";
import { ColorDots, FilmSwatch } from "@/hypotheses/plenka/components/film-swatch";

export function SeriesGrid() {
  return (
    <div className="space-y-10">
      {CATEGORIES.map((category) => (
        <section key={category.id}>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl">{category.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {category.lead}
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SERIES.filter((series) => series.category === category.id).map(
              (series) => (
                <Link
                  key={series.id}
                  to={plenkaPath(`/serii/${series.slug}`)}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white ring-1 ring-transparent transition hover:-translate-y-0.5 hover:ring-black/15"
                >
                  <FilmSwatch
                    colors={series.colors}
                    className="bg-[#ece7db]"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                          {series.seasons}
                        </p>
                        <h4 className="font-heading mt-1 text-xl leading-tight">
                          {series.name}
                        </h4>
                      </div>
                      <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition group-hover:text-foreground" />
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {series.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ea] px-2.5 py-1">
                        <ColorDots colors={series.colors} />
                        {series.colorLabel}
                      </span>
                      <span className="text-muted-foreground">
                        {skusForSeries(series.id).length} позиций в прайсе
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
