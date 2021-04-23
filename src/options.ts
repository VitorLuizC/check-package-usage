/**
 * The representation of options object.
 * @typedef {Object} Options
 * @property {BufferEncoding} encoding
 */

/** The representation of options object. */
export type Options = {
  encoding: BufferEncoding;
  exclude: string[];
};

/**
 * The default options object.
 * @type {Readonly<Options>}
 */
const DEFAULT_OPTIONS = Object.freeze<Options>({
  encoding: 'utf-8',
  exclude: ['./.git', './node_modules'],
});

/**
 * A mutable binding with options object.
 * @type {Options}
 */
export let options: Options = { ...DEFAULT_OPTIONS };

/**
 * A function that mutates options object.
 * @param {(options: Options) => Options} fn
 * @returns {Options}
 */
export function setOptions(fn: (options: Options) => Options): Options {
  // Updates exported binding with options object.
  options = fn(options);
  return options;
}
