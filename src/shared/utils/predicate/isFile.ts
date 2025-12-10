export function isFile(value: unknown): value is File {
  return value instanceof File;
}
