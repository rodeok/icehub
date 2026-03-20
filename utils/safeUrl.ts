const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/g;

function hasScheme(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value);
}

function normalize(value: string): string {
  // Trim + drop control chars to prevent `java\nscript:` style bypasses.
  return value.trim().replace(CONTROL_CHARS_RE, "");
}

export function safeHref(input: unknown, fallback = "#"): string {
  if (typeof input !== "string") return fallback;

  const value = normalize(input);
  if (!value) return fallback;

  // Allow local navigation.
  if (value.startsWith("#") || value.startsWith("/") || value.startsWith("./") || value.startsWith("../")) {
    return value;
  }

  // Disallow protocol-relative URLs.
  if (value.startsWith("//")) return fallback;

  // Allow a small, explicit protocol list.
  if (hasScheme(value)) {
    try {
      const url = new URL(value);
      const protocol = url.protocol.toLowerCase();
      if (protocol === "http:" || protocol === "https:" || protocol === "mailto:" || protocol === "tel:") {
        return value;
      }
      return fallback;
    } catch {
      return fallback;
    }
  }

  // Everything else (e.g. "example.com") is treated as unsafe/ambiguous.
  return fallback;
}

export function safeSrc(input: unknown, fallback = ""): string {
  if (typeof input !== "string") return fallback;

  const value = normalize(input);
  if (!value) return fallback;

  // Allow local assets.
  if (value.startsWith("/") || value.startsWith("./") || value.startsWith("../")) return value;
  if (value.startsWith("//")) return fallback;

  if (hasScheme(value)) {
    try {
      const url = new URL(value);
      const protocol = url.protocol.toLowerCase();
      if (protocol === "http:" || protocol === "https:") return value;
      return fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

