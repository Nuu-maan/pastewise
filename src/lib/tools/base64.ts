export function decodeBase64(input: string): string {
  const padded = input.padEnd(Math.ceil(input.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
