import { expect, test } from "bun:test";
import { contrast, parseColor, toHex, toHsl } from "./color";
import { nextRuns } from "./cron";
import { jsonToTs } from "./json";
import { decodeJwt } from "./jwt";
import { parseStack } from "./stack";
import { parseTimestamp } from "./timestamp";

test("json becomes TypeScript types", () => {
  const ts = jsonToTs({ id: 1, tags: ["a"], owner: { name: "x", "e-mail": null } });
  expect(ts).toContain("export interface Root {\n  id: number;\n  tags: string[];\n  owner: Owner;\n}");
  expect(ts).toContain('"e-mail": null;');
  expect(jsonToTs([1, "a"])).toBe("export type Root = (number | string)[];");
});

test("jwt claims decode with dates", () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.sig";
  const jwt = decodeJwt(token);
  expect(jwt.header.alg).toBe("HS256");
  expect(jwt.payload.sub).toBe("1");
  expect(jwt.expiresAt?.toISOString()).toBe("2018-01-18T02:30:22.000Z");
});

test("colors convert and measure contrast", () => {
  const c = parseColor("#f63");
  expect(toHex(c)).toBe("#ff6633");
  expect(toHsl(parseColor("rgb(255, 0, 0)"))).toBe("hsl(0, 100%, 50%)");
  expect(contrast(parseColor("#000"), parseColor("#fff"))).toBeCloseTo(21);
});

test("timestamps accept seconds, millis and ISO", () => {
  const iso = "2024-09-22T10:13:20.000Z";
  expect(parseTimestamp("1727000000").toISOString()).toBe(iso);
  expect(parseTimestamp("1727000000000").toISOString()).toBe(iso);
  expect(parseTimestamp(iso).toISOString()).toBe(iso);
});

test("cron yields upcoming runs", () => {
  const runs = nextRuns("0 9 * * *", 2, new Date("2026-01-01T12:00:00"));
  expect(runs.map((d) => d.getHours())).toEqual([9, 9]);
  expect(runs[0].getDate()).toBe(2);
});

test("stack traces parse node and python frames", () => {
  const node = parseStack(
    "TypeError: x is undefined\n    at List (/app/src/List.tsx:12:5)\n    at render (/app/node_modules/react/index.js:1:1)",
  );
  expect(node.message).toBe("TypeError: x is undefined");
  expect(node.frames).toEqual([
    { fn: "List", file: "/app/src/List.tsx", line: 12, internal: false },
    { fn: "render", file: "/app/node_modules/react/index.js", line: 1, internal: true },
  ]);
  const py = parseStack('Traceback (most recent call last):\n  File "app.py", line 3, in main\nKeyError: \'id\'');
  expect(py.frames[0]).toEqual({ fn: "main", file: "app.py", line: 3, internal: false });
  expect(py.message).toBe("KeyError: 'id'");
});
