export function parseTimestamp(text: string): Date {
  const t = text.trim();
  if (/^\d{13}$/.test(t)) return new Date(Number(t));
  if (/^\d{10}$/.test(t)) return new Date(Number(t) * 1000);
  return new Date(t);
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

export function relativeTime(date: Date, now = Date.now()): string {
  const seconds = Math.round((date.getTime() - now) / 1000);
  const [unit, size] = UNITS.find(([, s]) => Math.abs(seconds) >= s) ?? ["second", 1];
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round(seconds / size), unit);
}
