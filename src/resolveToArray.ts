/**
 * Resolves the value to array. If value is already an array just return it,
 * otherwise creates a new array with the value as first/single element.
 * @param {T | Array.<T>} value
 * @returns {Array.<T>}
 * @template T
 */
function resolveToArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export default resolveToArray;
