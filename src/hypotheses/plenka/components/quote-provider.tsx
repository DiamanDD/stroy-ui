
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FilmColor } from "@/hypotheses/plenka/lib/catalog";
import {
  findSku,
  lineKey,
  summarizeQuote,
  type QuoteLine,
  type QuoteTotals,
} from "@/hypotheses/plenka/lib/quote";

type AddPayload = {
  skuId: string;
  qty?: number;
  color?: FilmColor;
  perforation?: string;
};

type QuoteContextValue = {
  lines: QuoteLine[];
  totals: QuoteTotals;
  addLine: (payload: AddPayload) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  inquiryOpen: boolean;
  setInquiryOpen: (open: boolean) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const addLine = useCallback((payload: AddPayload) => {
    const sku = findSku(payload.skuId);
    if (!sku) return;
    const next: QuoteLine = {
      skuId: payload.skuId,
      qty: payload.qty ?? 1,
      color:
        payload.color ??
        (sku.seriesId === "agro-l-color" ? "green" : undefined),
      perforation: payload.perforation ?? sku.perforation?.[0],
    };
    setLines((prev) => {
      const key = lineKey(next);
      const existing = prev.find((line) => lineKey(line) === key);
      if (existing) {
        return prev.map((line) =>
          lineKey(line) === key ? { ...line, qty: line.qty + next.qty } : line
        );
      }
      return [...prev, next];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((line) => (lineKey(line) === key ? { ...line, qty } : line))
        .filter((line) => line.qty > 0)
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((line) => lineKey(line) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totals = useMemo(() => summarizeQuote(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      totals,
      addLine,
      setQty,
      removeLine,
      clear,
      inquiryOpen,
      setInquiryOpen,
    }),
    [lines, totals, addLine, setQty, removeLine, clear, inquiryOpen]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
