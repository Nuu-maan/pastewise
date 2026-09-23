import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Json, jsonStats, jsonToTs } from "@/lib/tools/json";
import { CodeBlock } from "./shared";

export function JsonTool({ text }: { text: string }) {
  const value = JSON.parse(text) as Json;
  const { keys, depth } = jsonStats(value);
  const views = [
    ["formatted", "Formatted", JSON.stringify(value, null, 2)],
    ["typescript", "TypeScript", jsonToTs(value)],
    ["minified", "Minified", JSON.stringify(value)],
  ];

  return (
    <Tabs defaultValue="formatted" className="gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TabsList>
          {views.map(([id, label]) => (
            <TabsTrigger key={id} value={id}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex gap-1.5">
          <Badge variant="secondary">{keys} keys</Badge>
          <Badge variant="secondary">depth {depth}</Badge>
        </div>
      </div>
      {views.map(([id, , code]) => (
        <TabsContent key={id} value={id}>
          <CodeBlock code={code} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
