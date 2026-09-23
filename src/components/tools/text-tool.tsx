import { CASES, textStats } from "@/lib/tools/text";
import { Field, Section } from "./shared";

export function TextTool({ text }: { text: string }) {
  const stats = textStats(text);
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries({
          Words: stats.words,
          Characters: stats.characters,
          Lines: stats.lines,
          "Min read": stats.readingMinutes,
        }).map(([label, value]) => (
          <div key={label} className="rounded-lg bg-muted/60 p-3">
            <p className="text-xl font-medium tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <Section title="Convert case">
        <div>
          {CASES.map(([label, fn]) => (
            <Field key={label} label={label} value={fn(text.slice(0, 80))} />
          ))}
        </div>
      </Section>
    </div>
  );
}
