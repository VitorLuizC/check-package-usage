/**
 * The representation of options object.
 * @typedef {Object} Options
 * @property {BufferEncoding} encoding
 */

/** The representation of options object. */
export type Options = {
  encoding: BufferEncoding;
};

/**
 * The default options object.
 * @type {Readonly<Options>}
 */
const DEFAULT_OPTIONS = Object.freeze<Options>({
  encoding: 'utf-8',
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
