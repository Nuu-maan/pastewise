import "server-only";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { questions } from "./questions";

const MODEL = process.env.JEV_MODEL || "jev-latest";

let client: TypeSafeClient | null = null;

export const hasJevKey = () => (process.env.TYPESAFE_API_KEY?.trim().length ?? 0) >= 12;

function getClient() {
  client ??= new TypeSafeClient({ defaultModel: MODEL, retry: { maxRetries: 0 }, timeout: 3000 });
  return client;
}

export async function classifyWithJev(text: string, signal?: AbortSignal) {
  const res = await getClient().systemOne({ state: { pasted: text }, questions }, { signal });
  const { kind, language, cause } = res.answers;
  return { kind: kind.choice, language: language.choice, cause: cause.choice, model: res.model };
}
