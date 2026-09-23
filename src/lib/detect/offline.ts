import type { Cause, FuzzyKind, Language } from "./types";

const STACK = /^\s+at .+[(:]\d+|Traceback \(most recent call last\)|^\s+File ".+", line \d+|panicked at|^goroutine \d+|Exception in thread/m;
const CODE = /[;{}]\s*$|^\s*(import|export|const|let|def|fn|func|class|public|#include|package)\b|=>|:=/m;

const LANGUAGE_HINTS: [Language, RegExp][] = [
  ["typescript", /\.tsx?:\d+|:\s*(string|number|boolean)\b|\binterface\s+\w+|\btype\s+\w+\s*=/],
  ["python", /^\s*(def|from \w+ import|import \w+$)|Traceback|File ".+\.py"/m],
  ["go", /^\s*(package \w+|func \w+\(|goroutine)|:=/m],
  ["rust", /\bfn \w+\(|\blet mut\b|panicked at|::new\(/],
  ["java", /\bpublic (static |class )|System\.out|Exception in thread|\.java:\d+/],
  ["cpp", /#include\s*<|std::/],
  ["ruby", /^\s*(def \w+|end$|require ')/m],
  ["php", /<\?php|\$\w+\s*=/],
  ["shell", /^\s*(\$ |sudo |apt |npm |cd |echo )|^#!/m],
  ["css", /^[.#]?[\w-]+\s*\{[^}]*:[^}]*;/m],
  ["html", /<\/?(div|span|html|body|p|a)\b/],
  ["javascript", /\b(const|let|function|require\(|console\.)|\.jsx?:\d+|=>/],
];

const CAUSE_HINTS: [Cause, RegExp][] = [
  ["null_reference", /undefined|null|NoneType|nil pointer|NullPointer/i],
  ["type_mismatch", /TypeError|is not a function|cannot be cast|mismatched types/i],
  ["network", /ECONNREFUSED|ENOTFOUND|fetch failed|network|socket/i],
  ["auth", /401|403|unauthori[sz]ed|forbidden|permission denied/i],
  ["not_found", /404|ENOENT|not found|no such file|ModuleNotFoundError|Cannot find module/i],
  ["syntax", /SyntaxError|unexpected token|parse error/i],
  ["timeout", /timeout|timed out|ETIMEDOUT|deadline exceeded/i],
];

const firstMatch = <T>(hints: [T, RegExp][], text: string, fallback: T) =>
  hints.find(([, re]) => re.test(text))?.[0] ?? fallback;

export function classifyOffline(text: string): { kind: FuzzyKind; language: Language; cause: Cause } {
  const kind: FuzzyKind = STACK.test(text) ? "stacktrace" : CODE.test(text) ? "code" : "text";
  return {
    kind,
    language: firstMatch(LANGUAGE_HINTS, text, "other"),
    cause: firstMatch(CAUSE_HINTS, text, "other"),
  };
}
