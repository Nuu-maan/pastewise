export function textStats(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return {
    characters: text.length,
    words,
    lines: text.split("\n").length,
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
}

export const CASES: [string, (s: string) => string][] = [
  ["UPPER", (s) => s.toUpperCase()],
  ["lower", (s) => s.toLowerCase()],
  ["Title", (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())],
  ["kebab-case", (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")],
  ["snake_case", (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")],
];
