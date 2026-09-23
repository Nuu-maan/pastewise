import { decodeBase64 } from "@/lib/tools/base64";
import { CodeBlock, Section } from "./shared";

export function Base64Tool({ text }: { text: string }) {
  return (
    <Section title="Decoded">
      <CodeBlock code={decodeBase64(text.trim())} />
    </Section>
  );
}
