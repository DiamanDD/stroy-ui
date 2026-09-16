import { COLOR_META, type FilmColor } from "@/hypotheses/plenka/lib/catalog";
import { cn } from "@/hypotheses/plenka/lib/utils";

export function FilmSwatch({
  colors,
  className,
}: {
  colors: FilmColor[];
  className?: string;
}) {
  const shown = colors.slice(0, 3);

  return (
    <div className={cn("relative h-28 overflow-hidden rounded-xl", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
      <div className="absolute inset-x-6 top-4 bottom-2 flex items-end justify-center gap-2">
        {shown.map((color, index) => (
          <div
            key={color}
            className="relative h-[88%] w-[34%] rounded-t-[999px] border border-black/10 shadow-[inset_12px_0_18px_rgba(255,255,255,0.28),0_10px_20px_rgba(0,0,0,0.18)]"
            style={{
              background:
                color === "clear"
                  ? "linear-gradient(180deg, rgba(225,242,255,0.85), rgba(170,205,230,0.55))"
                  : COLOR_META[color].swatch,
              transform: `translateY(${index === 1 ? 0 : 8}px)`,
              opacity: color === "clear" ? 0.92 : 0.96,
            }}
          >
            <div className="absolute inset-x-2 top-3 h-2 rounded-full bg-white/35" />
            <div className="absolute inset-x-0 top-[42%] h-px bg-white/25" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorDots({ colors }: { colors: FilmColor[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {colors.map((color) => (
        <span
          key={color}
          title={COLOR_META[color].label}
          className="size-2.5 rounded-full border border-black/15"
          style={{ background: COLOR_META[color].swatch }}
        />
      ))}
    </span>
  );
}
