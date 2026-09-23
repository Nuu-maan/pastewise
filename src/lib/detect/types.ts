export const RULE_KINDS = ["jwt", "json", "url", "timestamp", "color", "cron", "base64", "sql"] as const;
export const FUZZY_KINDS = ["stacktrace", "code", "text"] as const;

export type RuleKind = (typeof RULE_KINDS)[number];
export type FuzzyKind = (typeof FUZZY_KINDS)[number];
export type Kind = RuleKind | FuzzyKind;

export const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "ruby",
  "php",
  "shell",
  "css",
  "html",
  "other",
] as const;
export type Language = (typeof LANGUAGES)[number];

export const CAUSES = [
  "null_reference",
  "type_mismatch",
  "network",
  "auth",
  "not_found",
  "syntax",
  "timeout",
  "other",
] as const;
export type Cause = (typeof CAUSES)[number];

export type FuzzyDetection = {
  kind: FuzzyKind;
  language: Language;
  cause: Cause;
  source: "jev" | "offline";
  model: string;
  latencyMs: number;
};

export type Detection = { kind: RuleKind; source: "rules" } | FuzzyDetection;
