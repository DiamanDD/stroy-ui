
import { useMemo, useState } from "react";
import { COMPANY } from "@/hypotheses/plenka/lib/catalog";
import { formatQuoteMessage } from "@/hypotheses/plenka/lib/quote";
import { useQuote } from "@/hypotheses/plenka/components/quote-provider";
import { Button, buttonVariants } from "@/hypotheses/plenka/components/ui/button";
import { cn } from "@/hypotheses/plenka/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/hypotheses/plenka/components/ui/dialog";
import { Input } from "@/hypotheses/plenka/components/ui/input";
import { Label } from "@/hypotheses/plenka/components/ui/label";
import { Textarea } from "@/hypotheses/plenka/components/ui/textarea";

export function InquiryDialog() {
  const { inquiryOpen, setInquiryOpen, lines, totals, clear } = useQuote();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const message = useMemo(
    () => formatQuoteMessage(lines, { name, phone, email, comment }),
    [lines, name, phone, email, comment]
  );

  function resetForm() {
    setName("");
    setPhone("");
    setEmail("");
    setComment("");
    setError("");
    setSent(false);
  }

  function validate() {
    if (!name.trim()) return "Укажите имя, чтобы менеджер знал, как к вам обращаться.";
    if (!phone.trim() && !email.trim()) {
      return "Оставьте телефон или почту — иначе мы не сможем ответить.";
    }
    return "";
  }

  function handleOpenChange(open: boolean) {
    setInquiryOpen(open);
    if (!open) resetForm();
  }

  return (
    <Dialog open={inquiryOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {sent ? (
          <>
            <DialogHeader>
              <DialogTitle>Запрос собран</DialogTitle>
              <DialogDescription>
                Отправьте его в WhatsApp или письмом — так заявка сразу попадёт
                менеджеру завода. На этой странице письма сами не уходят.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-48 overflow-auto rounded-lg bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
              {message}
            </div>
            <DialogFooter className="gap-2 sm:justify-between">
              <a
                href={`${COMPANY.whatsapp}&text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Счёт на плёнку")}&body=${encodeURIComponent(message)}`}
                className={cn(buttonVariants(), "h-10 px-4")}
              >
                Отправить письмом
              </a>
            </DialogFooter>
          </>
        ) : (
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const nextError = validate();
              if (nextError) {
                setError(nextError);
                return;
              }
              setError("");
              setSent(true);
            }}
          >
            <DialogHeader>
              <DialogTitle>Запросить счёт</DialogTitle>
              <DialogDescription>
                {totals.rolls > 0
                  ? `В подборе ${totals.rolls} рул. на ${totals.listTotal.toLocaleString("ru-RU")} ₽ по базовой колонке.`
                  : "Можно отправить запрос без позиций — менеджер подберёт рукав по задаче."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="inq-name">Имя</Label>
                <Input
                  id="inq-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="inq-phone">Телефон</Label>
                <Input
                  id="inq-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="inq-email">Почта</Label>
              <Input
                id="inq-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={COMPANY.email}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="inq-comment">Задача</Label>
              <Textarea
                id="inq-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Теплица, упаковка, клубника, нужная ширина в развороте…"
              />
            </div>
            {error ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <DialogFooter>
              {totals.rolls > 0 ? (
                <Button type="button" variant="ghost" onClick={clear}>
                  Очистить подбор
                </Button>
              ) : null}
              <Button type="submit" className="h-10 px-4">
                Собрать заявку
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
