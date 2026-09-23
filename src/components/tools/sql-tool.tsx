import { format } from "sql-formatter";
import { CodeBlock, Section } from "./shared";

export function SqlTool({ text }: { text: string }) {
  return (
    <Section title="Formatted">
      <CodeBlock code={format(text, { keywordCase: "upper" })} />
    </Section>
  );
}
