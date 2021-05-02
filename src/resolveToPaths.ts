import resolvePath from './resolvePath.js';
import resolveToArray from './resolveToArray';

/**
 * The comma character.
 */
const COMMA = ',';

/**
 * Resolve argument to a list of paths.
 * @param {unknown} value
 * @returns {string[]}
 */
function resolveToPaths(value: unknown): string[] {
  return resolveToArray(value).flatMap((paths) =>
    String(paths)
      .split(COMMA)
      .map((path) => resolvePath(path)),
  );
}

export default resolveToPaths;
