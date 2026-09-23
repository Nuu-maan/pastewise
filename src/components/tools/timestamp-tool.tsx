import { parseTimestamp, relativeTime } from "@/lib/tools/timestamp";
import { Field } from "./shared";

export function TimestampTool({ text }: { text: string }) {
  const date = parseTimestamp(text);
  return (
    <div className="grid gap-4">
      <p className="text-2xl font-medium tracking-tight">{relativeTime(date)}</p>
      <div>
        <Field label="Local" value={date.toLocaleString()} />
        <Field label="UTC" value={date.toISOString()} />
        <Field label="Unix seconds" value={String(Math.floor(date.getTime() / 1000))} />
        <Field label="Unix millis" value={String(date.getTime())} />
      </div>
    </div>
  );
}
