/** Normalize jsonb values stored as string, object, or array */
export function asText(value: unknown, fallback = ""): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object" && value !== null && "text" in value) {
    const t = (value as { text?: unknown }).text;
    if (typeof t === "string") return t;
  }
  return fallback;
}

export function asStringArray(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    return value.filter((x): x is string => typeof x === "string");
  }
  return fallback;
}
