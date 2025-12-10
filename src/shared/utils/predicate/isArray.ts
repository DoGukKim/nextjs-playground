export function isArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr);
}
