import {
  AlignLeftIcon,
  BracesIcon,
  BugIcon,
  ClockIcon,
  CodeIcon,
  DatabaseIcon,
  KeyRoundIcon,
  LinkIcon,
  type LucideIcon,
  PaletteIcon,
  RepeatIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Detection, Kind } from "@/lib/detect/types";
import { Base64Tool } from "./base64-tool";
import { CodeTool } from "./code-tool";
import { ColorTool } from "./color-tool";
import { CronTool } from "./cron-tool";
import { JsonTool } from "./json-tool";
import { JwtTool } from "./jwt-tool";
import { SqlTool } from "./sql-tool";
import { StackTool } from "./stack-tool";
import { TextTool } from "./text-tool";
import { TimestampTool } from "./timestamp-tool";
import { UrlTool } from "./url-tool";

export const KIND_META: Record<Kind, { label: string; icon: LucideIcon }> = {
  json: { label: "JSON", icon: BracesIcon },
  jwt: { label: "JWT", icon: ShieldCheckIcon },
  url: { label: "URL", icon: LinkIcon },
  timestamp: { label: "Timestamp", icon: ClockIcon },
  color: { label: "Color", icon: PaletteIcon },
  cron: { label: "Cron", icon: RepeatIcon },
  base64: { label: "Base64", icon: KeyRoundIcon },
  sql: { label: "SQL", icon: DatabaseIcon },
  stacktrace: { label: "Stack trace", icon: BugIcon },
  code: { label: "Code", icon: CodeIcon },
  text: { label: "Text", icon: AlignLeftIcon },
};

export function ToolFor({ text, detection }: { text: string; detection: Detection }) {
  switch (detection.kind) {
    case "json":
      return <JsonTool text={text} />;
    case "jwt":
      return <JwtTool text={text} />;
    case "url":
      return <UrlTool text={text} />;
    case "timestamp":
      return <TimestampTool text={text} />;
    case "color":
      return <ColorTool text={text} />;
    case "cron":
      return <CronTool text={text} />;
    case "base64":
      return <Base64Tool text={text} />;
    case "sql":
      return <SqlTool text={text} />;
    case "stacktrace":
      return <StackTool text={text} cause={detection.cause} />;
    case "code":
      return <CodeTool text={text} language={detection.language} />;
    case "text":
      return <TextTool text={text} />;
  }
}
