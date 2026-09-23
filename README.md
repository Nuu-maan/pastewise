# pastewise

**Paste anything. Get the right tool.** One box that recognises what you pasted and turns into the tool for it.

```
{"user":{"id":42}}                    →  formatted JSON, TypeScript types, minified
eyJhbGciOiJIUzI1NiJ9…                  →  decoded JWT with expiry status
*/15 9-17 * * 1-5                     →  "Every 15 minutes, 9 AM–5:59 PM, Mon–Fri" + next runs
TypeError: Cannot read … 'map'        →  message, likely cause, your frames vs. library frames
#ff6b35                               →  HEX / RGB / HSL + WCAG contrast
1758000000                            →  local, UTC, relative time
https://…?q=shoes&size=42             →  URL parts and a query table
select … from users …                 →  formatted SQL
aGVsbG8gd29ybGQ=                      →  decoded base64
```

## How it works

Exact formats (JSON, JWT, URL, timestamp, color, cron, base64, SQL) are detected in the browser with plain rules: instant, no network.

Anything the rules can't pin down goes to [TypeSafe AI](https://typesafe.ai)'s **Jev** model, which answers three typed questions in one call: is this a stack trace, code or prose; which language; and, for errors, the most likely root cause. The tool itself is always deterministic code.

Without an API key it falls back to a built-in heuristic classifier, so it runs out of the box.

## Run it

Requires [Bun](https://bun.sh).

```bash
bun install
bun dev
```

To use the online model:

```bash
cp .env.example .env.local   # then set TYPESAFE_API_KEY
```

The key is read only on the server, in `/api/classify`.

## Layout

```
src/
  lib/detect/             rules for exact formats, offline fallback classifier
  lib/jev/                Jev questions and server client
  lib/tools/              pure helpers: JSON → TS, JWT, cron, color, stack parsing…
  app/api/classify/       POST { text } → kind, language, cause
  hooks/use-detection.ts  rules first, Jev for the rest
  components/tools/       one component per kind, plus the registry
  components/paste/       the workspace, kind badge, samples
```

Adding a tool: add the kind to `lib/detect/types.ts`, a rule or Jev option for it, a component in `components/tools/`, and a case in `registry.tsx`.

## Scripts

| Command | What it does |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run check` | Typecheck, lint and test |
| `bun run build` | Production build |
