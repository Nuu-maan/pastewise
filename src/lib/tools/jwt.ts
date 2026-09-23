import { decodeBase64 } from "./base64";

const decodePart = (part: string) => JSON.parse(decodeBase64(part.replace(/-/g, "+").replace(/_/g, "/")));

export function decodeJwt(token: string) {
  const [header, payload, signature = ""] = token.trim().split(".");
  const claims = decodePart(payload) as Record<string, unknown>;
  const toDate = (v: unknown) => (typeof v === "number" ? new Date(v * 1000) : null);
  return {
    header: decodePart(header) as Record<string, unknown>,
    payload: claims,
    signed: signature.length > 0,
    issuedAt: toDate(claims.iat),
    expiresAt: toDate(claims.exp),
  };
}
