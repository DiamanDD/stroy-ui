import { Link } from "react-router";
import { CatalogExplorer } from "@/hypotheses/plenka/components/catalog-explorer";
import { QuotePanel } from "@/hypotheses/plenka/components/quote-panel";
import { SeriesGrid } from "@/hypotheses/plenka/components/series-grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/hypotheses/plenka/components/ui/accordion";
import { buttonVariants } from "@/hypotheses/plenka/components/ui/button";
import { cn } from "@/hypotheses/plenka/lib/utils";
import { COMPANY, PRICE_DATE, PRICE_TIERS, SERIES, SKUS } from "@/hypotheses/plenka/lib/catalog";

const STEPS = [
  {
    title: "Рукав и разворот",
    text: "В прайсе ширина — это рукав. 2 м (2000 мм × 2) в развороте даёт 4 м полотна. Так кроят теплицу без лишнего стыка.",
  },
  {
    title: "Три ступени опта",
    text: "Цена рулона зависит от суммы заказа по колонке 1–100 тыс. ₽. Переход на 100 и 300 тысяч снижает цену примерно на 7% и 14%.",
  },
  {
    title: "Первичное сырьё",
    text: "Технические серии СТ и ГОСТ и мульча идут из первичного сырья. Агросерии дополнительно свето- и термостабилизированы.",
  },
];

const FAQ = [
  {
    q: "Почему у одного рукава 50 и 100 метров?",
    a: "Широкий 3-метровый рукав тяжёлый. Короткая намотка 50 м проще грузить и натягивать на каркас, 100 м — если нужен длинный контур без стыка.",
  },
  {
    q: "Чем АГРО-L отличается от АГРОСВЕТ и АГРОЛЮКС?",
    a: "АГРО-L — один сезон и светостабилизатор. АГРОСВЕТ-L — три сезона, зелёная, термо- и светостабилизация. АГРОЛЮКС-L — пять сезонов, голубая, до 180 мкм.",
  },
  {
    q: "Можно ли заказать нестандартную ширину?",
    a: "Да. Для мульчи от 30 рулонов завод режет ширину 1000–1300 мм и ставит свой шаг отверстий. По тепличной плёнке нестандарт уточняйте у менеджера — зависит от загрузки линии.",
  },
  {
    q: "Как везёте, если я не в Краснодаре?",
    a: "Самовывоз с площадки в х. Новый Сад или отгрузка любой транспортной компанией. По Краснодару есть адресная доставка.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(245,224,0,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <p className="text-xs tracking-[0.22em] text-[var(--brand-yellow)] uppercase">
              westenterprise.ru · прайс {PRICE_DATE}
            </p>
            <h1 className="font-heading mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
              Полиэтиленовая плёнка с завода: теплица, ГОСТ и мульча для клубники
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              Раздел собран по заводскому прайсу. {SERIES.length} серий, {SKUS.length}{" "}
              рулонных позиций, три ступени опта. Считаете подбор на странице и
              отправляете заявку менеджеру.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="#katalog"
                className={cn(
                  buttonVariants(),
                  "h-11 bg-[var(--brand-yellow)] px-5 text-black hover:bg-[var(--brand-yellow)]/90"
                )}
              >
                Открыть прайс
              </Link>
              <Link
                to="#serii"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 border-white/20 bg-transparent px-5 text-white hover:bg-white/10"
                )}
              >
                Смотреть серии
              </Link>
              <a
                href="/price-plenka-21-04-2026.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 px-5 text-white hover:bg-white/10"
                )}
              >
                Скачать PDF
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 self-end">
            {[
              ["8 серий", "от однолетней АГРО-L до пятилетней АГРОЛЮКС"],
              ["25–200 мкм", "теплица, упаковка, чёрная мульча"],
              ["3 ступени", "1–100 / 100–300 / свыше 300 тыс. ₽"],
              ["Первичка", "СТ, ГОСТ и клубничная мульча"],
            ].map(([stat, hint]) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <dt className="font-heading text-2xl">{stat}</dt>
                <dd className="mt-1 text-sm text-white/60">{hint}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <article key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-black/10">
            <p className="text-xs text-muted-foreground">0{index + 1}</p>
            <h2 className="font-heading mt-3 text-xl">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </article>
        ))}
      </section>

      <section id="serii" className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Каталог
            </p>
            <h2 className="font-heading mt-2 text-3xl sm:text-4xl">Серии плёнки</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            На текущем сайте раздел почти без SKU. Здесь каждая серия открывается
            своей карточкой и полным срезом прайса.
          </p>
        </div>
        <SeriesGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-[#1e3a2b] p-6 text-white sm:p-8">
          <p className="text-xs tracking-[0.18em] text-white/50 uppercase">
            Ступени прайса
          </p>
          <h2 className="font-heading mt-2 text-3xl">Чем больше отгрузка, тем ниже рулон</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PRICE_TIERS.map((tier) => (
              <div key={tier.id} className="rounded-xl bg-white/8 p-4 ring-1 ring-white/10">
                <p className="text-lg font-medium">{tier.label}</p>
                <p className="mt-2 text-sm text-white/70">{tier.hint}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/60">
            Подбор на этой странице считает ступень по сумме в базовой колонке,
            затем пересчитывает рулоны уже со скидкой.
          </p>
        </div>
      </section>

      <section id="katalog" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Прайс {PRICE_DATE}
          </p>
          <h2 className="font-heading mt-2 text-3xl sm:text-4xl">Все рулоны</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <CatalogExplorer />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuotePanel />
          </div>
        </div>
      </section>

      <section id="dostavka" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl">Отгрузка с площадки в Адыгее</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {COMPANY.address}. Если вы рядом — забираете сами. Если нет, отправляем
            через транспортную компанию на терминал или адресно. По Краснодару
            действует городская доставка.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={COMPANY.phone800Href} className={cn(buttonVariants(), "h-10 px-4")}>
              {COMPANY.phone800}
            </a>
            <a
              href={COMPANY.telegram}
              className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
            >
              Telegram
            </a>
          </div>
        </div>
        <Accordion className="rounded-2xl bg-white px-5 ring-1 ring-black/10">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="font-heading text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
