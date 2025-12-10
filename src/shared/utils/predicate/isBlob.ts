export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}
