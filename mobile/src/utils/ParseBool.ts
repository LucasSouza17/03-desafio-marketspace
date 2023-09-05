export function parseBool(value: string | boolean) {
  if(value === "true") {
    return true
  } else {
    return false
  }
}
