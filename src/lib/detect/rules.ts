import { CronExpressionParser } from "cron-parser";
import type { RuleKind } from "./types";

const isJson = (t: string) => {
  if (!/^[[{]/.test(t)) return false;
  try {
    JSON.parse(t);
    return true;
  } catch {
    return false;
  }
};

const isUrl = (t: string) => /^https?:\/\/\S+$/.test(t) && URL.canParse(t);

const isTimestamp = (t: string) =>
  /^\d{10}(\d{3})?$/.test(t) || (/^\d{4}-\d{2}-\d{2}([T ][\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/.test(t) && !isNaN(Date.parse(t)));

const isColor = (t: string) =>
  /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(t) || /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/i.test(t);

const isCron = (t: string) => {
  if (!/^([\d*/,?LW#A-Z-]+\s+){4,5}[\d*/,?LW#A-Z-]+$/i.test(t)) return false;
  try {
    CronExpressionParser.parse(t);
    return true;
  } catch {
    return false;
  }
};

const isBase64 = (t: string) => {
  if (t.length < 16 || t.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(t)) return false;
  const decoded = atob(t);
  return [...decoded].every((c) => c >= " " || c === "\n" || c === "\t");
};

const isSql = (t: string) =>
  /^(select|insert|update|delete|with|create|alter|drop)\b/i.test(t) &&
  /\b(from|into|set|table|index|view|values)\b/i.test(t);

const RULES: [RuleKind, (t: string) => boolean][] = [
  ["jwt", (t) => /^eyJ[\w-]+\.eyJ[\w-]+\.[\w-]*$/.test(t)],
  ["json", isJson],
  ["url", isUrl],
  ["timestamp", isTimestamp],
  ["color", isColor],
  ["cron", isCron],
  ["base64", isBase64],
  ["sql", isSql],
];

export function detectByRules(text: string): RuleKind | null {
  const t = text.trim();
  return RULES.find(([, test]) => test(t))?.[0] ?? null;
}
