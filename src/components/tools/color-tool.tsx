import { Badge } from "@/components/ui/badge";
import { contrast, parseColor, toHex, toHsl, toRgb } from "@/lib/tools/color";
import { Field } from "./shared";

const WHITE = { r: 255, g: 255, b: 255, a: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };

function ContrastChip({ ratio, on }: { ratio: number; on: string }) {
  return (
    <Badge variant={ratio >= 4.5 ? "secondary" : "outline"} className="font-mono">
      {ratio.toFixed(2)} on {on} · {ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "fail"}
    </Badge>
  );
}

export function ColorTool({ text }: { text: string }) {
  const color = parseColor(text);
  const hex = toHex(color);
  const onWhite = contrast(color, WHITE);
  const onBlack = contrast(color, BLACK);

  return (
    <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
      <div
        className="grid aspect-square place-items-center rounded-xl ring-1 ring-foreground/10"
        style={{ background: toRgb(color), color: onWhite > onBlack ? "#fff" : "#000" }}
      >
        <span className="font-mono text-sm">Aa</span>
      </div>
      <div className="grid content-start gap-4">
        <div>
          <Field label="HEX" value={hex} />
          <Field label="RGB" value={toRgb(color)} />
          <Field label="HSL" value={toHsl(color)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <ContrastChip ratio={onWhite} on="white" />
          <ContrastChip ratio={onBlack} on="black" />
        </div>
      </div>
    </div>
  );
}
