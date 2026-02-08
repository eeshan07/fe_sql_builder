export function parseColumns(columnsRaw) {
  try {
    if (!columnsRaw) return [];

    // already object
    if (typeof columnsRaw === "object") {
      return columnsRaw.columns || [];
    }

    // if string, parse JSON
    if (typeof columnsRaw === "string") {
      const parsed = JSON.parse(columnsRaw);
      return parsed.columns || [];
    }

    return [];
  } catch (err) {
    console.error("Failed to parse columns:", columnsRaw, err);
    return [];
  }
}
