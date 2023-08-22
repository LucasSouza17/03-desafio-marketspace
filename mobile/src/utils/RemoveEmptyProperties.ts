export function removeEmptyProperties(obj: {}) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
