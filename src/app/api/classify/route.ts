import { z } from "zod";
import { classifyOffline } from "@/lib/detect/offline";
import type { FuzzyDetection } from "@/lib/detect/types";
import { classifyWithJev, hasJevKey } from "@/lib/jev/client";

const body = z.object({ text: z.string().trim().min(1).max(20000) });

const elapsed = (started: number) => Math.round(performance.now() - started);

export async function POST(request: Request) {
  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Expected { text: string }" }, { status: 400 });

  const text = parsed.data.text.slice(0, 4000);
  const started = performance.now();
  const offline = (): FuzzyDetection => ({
    ...classifyOffline(text),
    source: "offline",
    model: "offline",
    latencyMs: elapsed(started),
  });

  if (!hasJevKey()) return Response.json(offline());

  try {
    const result = await classifyWithJev(text, request.signal);
    return Response.json({ ...result, source: "jev", latencyMs: elapsed(started) } satisfies FuzzyDetection);
  } catch (err) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    console.warn("[jev] falling back to offline:", err instanceof Error ? err.message : err);
    return Response.json(offline());
  }
}
