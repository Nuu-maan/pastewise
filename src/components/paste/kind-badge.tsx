import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { Detection } from "@/lib/detect/types";
import { KIND_META } from "@/components/tools/registry";

const via = (d: Detection) => (d.source === "rules" ? "exact match" : `${d.model} · ${d.latencyMs}ms`);

export function KindBadge({ detection, pending }: { detection: Detection | null; pending: boolean }) {
  const meta = detection && KIND_META[detection.kind];
  return (
    <div className="flex min-w-0 items-center gap-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={detection?.kind ?? "idle"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          {meta ? (
            <Badge className="h-6 gap-1.5 px-2.5">
              <meta.icon />
              {meta.label}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">Paste anything</span>
          )}
        </motion.div>
      </AnimatePresence>
      <span className="truncate font-mono text-xs text-muted-foreground" aria-live="polite">
        {pending ? "reading…" : detection ? via(detection) : ""}
      </span>
    </div>
  );
}
