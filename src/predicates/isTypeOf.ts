function isTypeOf(type: 'string'): (value: unknown) => value is string;
function isTypeOf(type: 'number'): (value: unknown) => value is number;
function isTypeOf(type: 'bigint'): (value: unknown) => value is bigint;
function isTypeOf(type: 'boolean'): (value: unknown) => value is boolean;
function isTypeOf(type: 'symbol'): (value: unknown) => value is symbol;
function isTypeOf(type: 'undefined'): (value: unknown) => value is undefined;
// eslint-disable-next-line @typescript-eslint/ban-types
function isTypeOf(type: 'object'): (value: unknown) => value is null | object;
// eslint-disable-next-line @typescript-eslint/ban-types
function isTypeOf(type: 'function'): (value: unknown) => value is Function;
function isTypeOf(type: string) {
  return (value: unknown): boolean => typeof value === type;
}

export default isTypeOf;
