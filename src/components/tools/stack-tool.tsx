import { LightbulbIcon } from "lucide-react";
import type { Cause } from "@/lib/detect/types";
import { parseStack } from "@/lib/tools/stack";
import { cn } from "@/lib/utils";
import { Section } from "./shared";

const CAUSE_HINTS: Record<Cause, { title: string; hint: string }> = {
  null_reference: { title: "Null or undefined value", hint: "Something you're reading from wasn't there yet. Check the first app frame and guard or await it." },
  type_mismatch: { title: "Wrong type", hint: "A value is being called or used as a type it isn't. Log it right before the failing line." },
  network: { title: "Network failure", hint: "The request never got a response. Check the host, port and that the service is running." },
  auth: { title: "Auth rejected", hint: "Credentials are missing, expired or lack permission. Check tokens and scopes." },
  not_found: { title: "Not found", hint: "A file, module, route or record doesn't exist at that path. Check spelling and install steps." },
  syntax: { title: "Syntax error", hint: "The code or data didn't parse. Look at the exact line and column reported." },
  timeout: { title: "Timeout", hint: "Something took too long. Check for slow queries, hung requests or missing timeouts." },
  other: { title: "Unclear cause", hint: "Start from the first frame in your own code, not in dependencies." },
};

export function StackTool({ text, cause }: { text: string; cause: Cause }) {
  const { message, frames } = parseStack(text);
  const { title, hint } = CAUSE_HINTS[cause];
  const firstOwn = frames.find((f) => !f.internal);

  return (
    <div className="grid gap-5">
      <p className="font-mono text-sm break-words text-destructive">{message}</p>
      <div className="flex gap-3 rounded-lg bg-muted/60 p-4">
        <LightbulbIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="grid gap-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{hint}</p>
        </div>
      </div>
      {frames.length > 0 && (
        <Section title={`Frames · ${frames.length}`}>
          <ol className="grid">
            {frames.map((f, i) => (
              <li
                key={i}
                className={cn(
                  "flex justify-between gap-4 border-b py-2 font-mono text-xs last:border-0",
                  f.internal && "opacity-40",
                  f === firstOwn && "font-semibold",
                )}
              >
                <span className="truncate">{f.fn}</span>
                <span className="truncate text-muted-foreground">
                  {f.file.split("/").slice(-2).join("/")}:{f.line}
                </span>
              </li>
            ))}
          </ol>
        </Section>
      )}
    </div>
  );
}
