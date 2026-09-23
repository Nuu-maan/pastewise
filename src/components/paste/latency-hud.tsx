import type { Detection } from "@/lib/detect/types";

const describe = (d: Detection) =>
  d.source === "rules" ? "0ms · rules" : `${d.latencyMs}ms · 3q · ${d.source === "offline" ? "jev-offline" : d.model}`;

export function LatencyHud({ detection, pending }: { detection: Detection | null; pending: boolean }) {
  return (
    <p className="fixed right-4 bottom-4 font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
      {pending ? "reading…" : detection ? describe(detection) : ""}
    </p>
  );
}
