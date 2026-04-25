type FlatObject = Record<string, unknown>
type NestedObject = Record<string, any>

function parseValue(value: unknown): unknown {
  if (typeof value !== "string") return value

  const v = value.trim()

  // booleans
  if (v === "true") return true
  if (v === "false") return false

  // null
  if (v === "null") return null

  // JSON arrays / objects (eg "[...]" or "{...}")
  if (v.startsWith("[") || v.startsWith("{")) {
    try {
      return JSON.parse(v)
    } catch {
      // invalid JSON → fall through as string
    }
  }

  // numbers (int or float)
  if (v !== "" && !Number.isNaN(Number(v))) {
    return Number(v)
  }

  // fallback string
  return value
}

export function unflattenObject<T extends NestedObject = NestedObject>(
  flatObj: FlatObject,
): T {
  const result: NestedObject = {}

  for (const [flatKey, rawValue] of Object.entries(flatObj)) {
    const keys = flatKey.split(".")
    let current: any = result

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const isLeaf = i === keys.length - 1

      if (isLeaf) {
        // leaf can be array/object/primitive (eg "slides" -> JSON array string)
        current[key] = parseValue(rawValue)
        break
      }

      const existing = current[key]

      // ensure path segments are plain objects only
      if (
        existing == null ||
        typeof existing !== "object" ||
        Array.isArray(existing)
      ) {
        current[key] = {}
      }

      current = current[key]
    }
  }

  return result as T
}
