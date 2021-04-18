import path from 'path';

/**
 * Resolve path with received segments.
 * @param {...string} segments
 * @returns {string}
 */
function resolvePath(...segments: string[]): string {
  return path.resolve(process.cwd(), ...segments);
}

export default resolvePath;
