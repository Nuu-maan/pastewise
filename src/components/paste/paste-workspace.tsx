"use client";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ToolBoundary } from "@/components/tools/tool-boundary";
import { ToolFor } from "@/components/tools/registry";
import { useDetection } from "@/hooks/use-detection";
import { KindBadge } from "./kind-badge";
import { SAMPLES } from "./samples";

export function PasteWorkspace() {
  const [text, setText] = useState("");
  const { detection, pending } = useDetection(text);

  return (
    <div className="grid gap-6">
      <Card className="gap-0 py-0 shadow-xl shadow-foreground/5">
        <CardHeader className="flex h-12 items-center justify-between border-b [.border-b]:pb-0">
          <KindBadge detection={detection} pending={pending} />
          {text && (
            <Button variant="ghost" size="icon-sm" onClick={() => setText("")} aria-label="Clear">
              <XIcon />
            </Button>
          )}
        </CardHeader>
        <Textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste JSON, a JWT, a cron expression, a stack trace, a color…"
          aria-label="Pasted content"
          spellCheck={false}
          className="max-h-64 min-h-36 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm shadow-none focus-visible:ring-0 md:text-sm dark:bg-transparent"
        />
        <AnimatePresence initial={false}>
          {detection && (
            <motion.div
              key={detection.kind}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <CardContent className="border-t py-5">
                <ToolBoundary key={text}>
                  <ToolFor text={text} detection={detection} />
                </ToolBoundary>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground">Try</span>
        {SAMPLES.map(([label, sample]) => (
          <Button key={label} variant="outline" size="sm" className="rounded-full font-normal" onClick={() => setText(sample)}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
