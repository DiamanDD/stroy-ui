import { COMPANY, PRICE_DATE } from "@/hypotheses/plenka/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">{COMPANY.name}</p>
          <p className="mt-2 max-w-sm text-sm text-white/65">
            Завод нетканых материалов и полиэтиленовых плёнок на юге России.
            Прайс плёнки от {PRICE_DATE}.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-white/45">Контакты</p>
          <a className="mt-2 block hover:text-[var(--brand-yellow)]" href={COMPANY.phone800Href}>
            {COMPANY.phone800}
          </a>
          <a className="block hover:text-[var(--brand-yellow)]" href={COMPANY.phoneKrasnodarHref}>
            {COMPANY.phoneKrasnodar}
          </a>
          <a className="block hover:text-[var(--brand-yellow)]" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>
        </div>
        <div className="text-sm text-white/65">
          <p className="text-white/45">Адрес отгрузки</p>
          <p className="mt-2">{COMPANY.address}</p>
          <p className="mt-4 text-white/40">Самовывоз или любая транспортная компания.</p>
        </div>
      </div>
    </footer>
  );
}
