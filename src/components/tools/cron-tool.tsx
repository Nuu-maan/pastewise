import { describeCron, nextRuns } from "@/lib/tools/cron";
import { relativeTime } from "@/lib/tools/timestamp";
import { Section } from "./shared";

export function CronTool({ text }: { text: string }) {
  return (
    <div className="grid gap-5">
      <p className="text-2xl font-medium tracking-tight">{describeCron(text)}</p>
      <Section title="Next runs">
        <ol className="grid gap-1">
          {nextRuns(text).map((d) => (
            <li key={d.getTime()} className="flex justify-between border-b py-2 text-sm last:border-0">
              <span className="font-mono">{d.toLocaleString()}</span>
              <span className="text-muted-foreground">{relativeTime(d)}</span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
