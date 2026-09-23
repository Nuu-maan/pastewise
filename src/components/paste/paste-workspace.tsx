"use client";

import { MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import { ToolBoundary } from "@/components/tools/tool-boundary";
import { ToolFor } from "@/components/tools/registry";
import { useDetection } from "@/hooks/use-detection";
import { panel, row } from "@/lib/motion";
import { KindBadge } from "./kind-badge";
import { LatencyHud } from "./latency-hud";
import { SAMPLES } from "./samples";

const PLACEHOLDERS = ["Paste some JSON", "Paste a JWT", "Paste a cron expression", "Paste a stack trace", "Paste a color"];

export function PasteWorkspace() {
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState(0);
  const { detection, pending } = useDetection(text);

  useEffect(() => {
    const id = setInterval(() => setPlaceholder((i) => (i + 1) % PLACEHOLDERS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid w-full max-w-2xl gap-4">
        <div className="focus-glow overflow-hidden rounded-[28px] border bg-card">
          <Textarea
            autoFocus
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setText("")}
            placeholder={`${PLACEHOLDERS[placeholder]}…`}
            aria-label="Pasted content"
            spellCheck={false}
            className="max-h-48 min-h-0 resize-none rounded-none border-0 bg-transparent px-5 py-4 text-xl shadow-none focus-visible:ring-0 md:text-xl [&:not(:placeholder-shown)]:font-mono [&:not(:placeholder-shown)]:text-sm"
          />
          {detection && (
            <motion.div variants={panel} initial="hidden" animate="shown">
              <div className="grid gap-5 px-5 pt-1 pb-4">
                <motion.div variants={row}>
                  <KindBadge detection={detection} />
                </motion.div>
                <motion.div key={detection.kind} variants={row} initial="hidden" animate="shown">
                  <ToolBoundary key={text}>
                    <ToolFor text={text} detection={detection} />
                  </ToolBoundary>
                </motion.div>
                <motion.p variants={row} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Kbd>Esc</Kbd> to clear
                </motion.p>
              </div>
            </motion.div>
          )}
        </div>
        {!text && (
          <div className="grid gap-2 text-center text-sm text-muted-foreground">
            <p>Paste anything. It becomes the tool you need.</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              <span>Try</span>
              {SAMPLES.map(([label, sample]) => (
                <button
                  key={label}
                  onClick={() => setText(sample)}
                  className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        <LatencyHud detection={detection} pending={pending} />
      </div>
    </MotionConfig>
  );
}
