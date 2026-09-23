import { Badge } from "@/components/ui/badge";
import type { Language } from "@/lib/detect/types";

export function CodeTool({ text, language }: { text: string; language: Language }) {
  const lines = text.split("\n");
  const indent = lines.some((l) => l.startsWith("\t")) ? "tabs" : "spaces";

  return (
    <div className="flex flex-wrap gap-1.5">
      <Badge>{language === "other" ? "unknown language" : language}</Badge>
      <Badge variant="secondary">{lines.length} lines</Badge>
      <Badge variant="secondary">{indent}</Badge>
    </div>
  );
}
