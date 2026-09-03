type PlainObject = Record<string, unknown>

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Deep-merge defaults with DB patch. Arrays in patch replace defaults entirely. */
export function mergeContent<T>(defaults: T, patch: Partial<T> | undefined): T {
  if (!patch || Object.keys(patch).length === 0) return defaults

  if (Array.isArray(defaults)) {
    return (Array.isArray(patch) ? patch : defaults) as T
  }

  if (!isPlainObject(defaults)) {
    return (patch as T) ?? defaults
  }

  const result = { ...defaults } as PlainObject
  const patchObj = patch as PlainObject

  for (const key of Object.keys(patchObj)) {
    const patchValue = patchObj[key]
    if (patchValue === undefined) continue

    const defaultValue = (defaults as PlainObject)[key]

    if (Array.isArray(patchValue)) {
      result[key] = patchValue
    } else if (isPlainObject(patchValue) && isPlainObject(defaultValue)) {
      result[key] = mergeContent(defaultValue, patchValue as PlainObject)
    } else {
      result[key] = patchValue
    }
  }

  return result as T
}
