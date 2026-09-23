"use client";

import { useEffect, useMemo, useState } from "react";
import { detectByRules } from "@/lib/detect/rules";
import type { Detection, FuzzyDetection } from "@/lib/detect/types";

export function useDetection(text: string, debounceMs = 300) {
  const ruleKind = useMemo(() => detectByRules(text), [text]);
  const needsModel = !ruleKind && text.trim().length > 0;
  const [fuzzy, setFuzzy] = useState<{ text: string; result: FuzzyDetection } | null>(null);

  useEffect(() => {
    if (!needsModel) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/classify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });
        if (res.ok) setFuzzy({ text, result: await res.json() });
      } catch {}
    }, debounceMs);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, needsModel, debounceMs]);

  const detection: Detection | null = ruleKind
    ? { kind: ruleKind, source: "rules" }
    : needsModel
      ? (fuzzy?.result ?? null)
      : null;

  return { detection, pending: needsModel && fuzzy?.text !== text };
}
