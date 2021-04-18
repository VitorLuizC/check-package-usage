import resolvePath from './resolvePath';

/**
 * Get a list of packages from package.json's dependencies and devDependencies.
 * @returns {string[]}
 */
async function getPackages(): Promise<string[]> {
  try {
    const path = resolvePath('package.json');

    const { dependencies = {}, devDependencies = {} } = await import(path);

    return [...Object.keys(dependencies), ...Object.keys(devDependencies)];
  } catch {
    // TODO: Use original error as reason.
    process.stdout.write("Error: Couldn't import 'package.json'.");
    process.exit(1);
  }
}

export default getPackages;
