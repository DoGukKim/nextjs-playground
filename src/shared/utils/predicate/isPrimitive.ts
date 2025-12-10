type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export function isPrimitive(value: unknown): value is Primitive {
  return (
    value == null || (typeof value !== "object" && typeof value !== "function")
  );
}
