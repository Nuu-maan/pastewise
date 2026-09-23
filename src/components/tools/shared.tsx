"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <Button variant="ghost" size="icon-xs" onClick={copy} aria-label="Copy" className={className}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

export function Field({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="group flex items-center justify-between gap-4 border-b py-2.5 last:border-0">
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="flex min-w-0 items-center gap-1">
        <span className={cn("truncate text-sm", mono && "font-mono")}>{value}</span>
        <CopyButton value={value} className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" />
      </span>
    </div>
  );
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative rounded-lg bg-muted/60", className)}>
      <CopyButton value={code} className="absolute top-2 right-2" />
      <pre className="max-h-96 overflow-auto p-4 pr-10 font-mono text-xs leading-relaxed">{code}</pre>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</h3>
      {children}
    </section>
  );
}
