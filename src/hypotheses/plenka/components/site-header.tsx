
import { useState } from "react";
import { Link } from "react-router";
import { Menu, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/hypotheses/plenka/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/hypotheses/plenka/components/ui/sheet";
import { COMPANY } from "@/hypotheses/plenka/lib/catalog";
import { cn } from "@/hypotheses/plenka/lib/utils";
import { useQuote } from "@/hypotheses/plenka/components/quote-provider";
import { plenkaPath } from "@/hypotheses/plenka/paths";

const NAV = [
  { href: plenkaPath("/#serii"), label: "Серии" },
  { href: plenkaPath("/#katalog"), label: "Прайс" },
  { href: plenkaPath("/#podbor"), label: "Подбор" },
  { href: plenkaPath("/#dostavka"), label: "Доставка" },
];

export function SiteHeader() {
  const { setInquiryOpen, totals } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 text-xs sm:px-6">
        <a
          href={`mailto:${COMPANY.email}`}
          className="truncate text-white/80 hover:text-white"
        >
          {COMPANY.email}
        </a>
        <div className="flex items-center gap-4">
          <a href={COMPANY.phone800Href} className="hidden sm:inline hover:text-[var(--brand-yellow)]">
            {COMPANY.phone800}
          </a>
          <a href={COMPANY.phoneKrasnodarHref} className="hover:text-[var(--brand-yellow)]">
            {COMPANY.phoneKrasnodar}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to={plenkaPath()} className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-semibold tracking-tight">
              Вест Энтерпрайз
            </span>
            <span className="hidden text-xs text-white/55 sm:inline">плёнка с завода</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} to={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              className="hidden h-10 bg-[var(--brand-yellow)] px-4 text-black hover:bg-[var(--brand-yellow)]/90 sm:inline-flex"
              onClick={() => setInquiryOpen(true)}
            >
              Запросить счёт
              {totals.rolls > 0 ? ` · ${totals.rolls}` : ""}
            </Button>
            <a
              href={COMPANY.phoneKrasnodarHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-white/20 bg-transparent text-white hover:bg-white/10 sm:hidden"
              )}
            >
              <Phone />
              <span className="sr-only">Позвонить</span>
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "border-white/20 bg-transparent text-white hover:bg-white/10 lg:hidden"
                )}
              >
                <Menu />
                <span className="sr-only">Меню</span>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Раздел плёнки</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3 px-4">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    className="mt-4 h-11 bg-[var(--brand-yellow)] text-black hover:bg-[var(--brand-yellow)]/90"
                    onClick={() => {
                      setMenuOpen(false);
                      setInquiryOpen(true);
                    }}
                  >
                    Запросить счёт
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
