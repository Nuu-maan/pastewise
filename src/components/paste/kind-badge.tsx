import { AnimatePresence, motion } from "motion/react";
import type { Detection } from "@/lib/detect/types";
import { KIND_META } from "@/components/tools/registry";

export function KindBadge({ detection }: { detection: Detection }) {
  const meta = KIND_META[detection.kind];
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={detection.kind}
        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3"
      >
        <div className="grid size-11 place-items-center rounded-xl bg-muted">
          <meta.icon className="size-5" />
        </div>
        <span className="font-medium">{meta.label}</span>
        <span className="text-sm text-muted-foreground">
          {detection.source === "rules" ? "exact match" : "read by Jev"}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
