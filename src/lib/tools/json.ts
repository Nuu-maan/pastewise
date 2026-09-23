type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const pascal = (s: string) => s.replace(/(^|[^a-zA-Z0-9])([a-zA-Z0-9])/g, (_, __, c: string) => c.toUpperCase()) || "Item";
const safeKey = (k: string) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));

export function jsonToTs(root: Json, rootName = "Root"): string {
  const out: string[] = [];

  const typeOf = (value: Json, name: string): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      const items = [...new Set(value.map((v) => typeOf(v, `${name}Item`)))];
      if (!items.length) return "unknown[]";
      return items.length === 1 ? `${items[0]}[]` : `(${items.join(" | ")})[]`;
    }
    if (typeof value === "object") {
      const fields = Object.entries(value).map(([k, v]) => `  ${safeKey(k)}: ${typeOf(v, pascal(k))};`);
      out.push(`export interface ${name} {\n${fields.join("\n")}\n}`);
      return name;
    }
    return typeof value;
  };

  const top = typeOf(root, rootName);
  if (top !== rootName) out.push(`export type ${rootName} = ${top};`);
  return [...new Set(out)].join("\n\n");
}

export function jsonStats(value: Json) {
  let keys = 0;
  let depth = 0;
  const walk = (v: Json, d: number) => {
    depth = Math.max(depth, d);
    if (v && typeof v === "object") {
      const children = Array.isArray(v) ? v : Object.values(v);
      if (!Array.isArray(v)) keys += children.length;
      children.forEach((c) => walk(c, d + 1));
    }
  };
  walk(value, 0);
  return { keys, depth };
}

export type { Json };
