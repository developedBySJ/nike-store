export function removeUndefined(obj: { [key: string]: any }) {
  return JSON.parse(JSON.stringify(obj))
}