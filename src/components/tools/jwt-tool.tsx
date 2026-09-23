"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { decodeJwt } from "@/lib/tools/jwt";
import { relativeTime } from "@/lib/tools/timestamp";
import { CodeBlock, Field, Section } from "./shared";

export function JwtTool({ text }: { text: string }) {
  const [now] = useState(Date.now);
  const jwt = decodeJwt(text);
  const expired = jwt.expiresAt ? jwt.expiresAt.getTime() < now : false;

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary">{String(jwt.header.alg ?? "unknown")}</Badge>
        {jwt.expiresAt && (
          <Badge variant={expired ? "destructive" : "secondary"}>
            {expired ? "Expired" : "Expires"} {relativeTime(jwt.expiresAt, now)}
          </Badge>
        )}
        {!jwt.signed && <Badge variant="destructive">Unsigned</Badge>}
      </div>
      {(jwt.issuedAt || jwt.expiresAt) && (
        <div>
          {jwt.issuedAt && <Field label="Issued" value={jwt.issuedAt.toLocaleString()} />}
          {jwt.expiresAt && <Field label="Expires" value={jwt.expiresAt.toLocaleString()} />}
        </div>
      )}
      <Section title="Payload">
        <CodeBlock code={JSON.stringify(jwt.payload, null, 2)} />
      </Section>
      <Section title="Header">
        <CodeBlock code={JSON.stringify(jwt.header, null, 2)} />
      </Section>
    </div>
  );
}
