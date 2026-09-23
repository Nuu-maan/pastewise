export type Frame = { fn: string; file: string; line: number; internal: boolean };

const FRAME_PATTERNS = [
  /^\s*at (?:(.+?) \()?(.+?):(\d+)(?::\d+)?\)?$/,
  /^\s*File "(.+?)", line (\d+), in (.+)$/,
  /^\s*at ([\w.$<>]+)\((.+?):(\d+)\)$/,
];

const INTERNAL = /node_modules|node:internal|site-packages|<frozen|\/lib\/python|java\.base/;

function parseFrame(line: string): Frame | null {
  for (const [i, re] of FRAME_PATTERNS.entries()) {
    const m = line.match(re);
    if (!m) continue;
    const [fn, file, lineNo] = i === 1 ? [m[3], m[1], m[2]] : [m[1] ?? "<anonymous>", m[2], m[3]];
    return { fn, file, line: Number(lineNo), internal: INTERNAL.test(file) };
  }
  return null;
}

export function parseStack(text: string) {
  const lines = text.trim().split("\n");
  const frames = lines.map(parseFrame).filter((f): f is Frame => f !== null);
  const message =
    lines.findLast((l) => /^\w*(Error|Exception)\b/.test(l.trim()))?.trim() ??
    lines.find((l) => !parseFrame(l) && l.trim())?.trim() ??
    "";
  return { message, frames };
}
