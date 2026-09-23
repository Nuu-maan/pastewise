import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Field, Section } from "./shared";

export function UrlTool({ text }: { text: string }) {
  const url = new URL(text.trim());
  const params = [...url.searchParams];

  return (
    <div className="grid gap-5">
      <div>
        <Field label="Protocol" value={url.protocol.replace(":", "")} />
        <Field label="Host" value={url.host} />
        <Field label="Path" value={decodeURIComponent(url.pathname)} />
        {url.hash && <Field label="Hash" value={url.hash} />}
      </div>
      {params.length > 0 && (
        <Section title={`Query · ${params.length}`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-mono text-xs">
              {params.map(([key, value], i) => (
                <TableRow key={i}>
                  <TableCell>{key}</TableCell>
                  <TableCell className="break-all whitespace-normal">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      )}
    </div>
  );
}
