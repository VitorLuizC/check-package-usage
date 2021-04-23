function isArrayOf<T>(
  predicate: (
    value: unknown,
    index: number,
    array: readonly unknown[],
  ) => value is T,
): (value: unknown) => value is T[];
function isArrayOf(
  predicate: (
    value: unknown,
    index: number,
    array: readonly unknown[],
  ) => boolean,
) {
  return (value: unknown): value is unknown[] =>
    Array.isArray(value) && value.every(predicate);
}

export default isArrayOf;
