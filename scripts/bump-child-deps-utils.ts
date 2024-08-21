import c from 'chalk';
import path from 'node:path';
import { sh } from './utils';
import { readJson, root, writeJson } from './versions';

/*
 * Use `npm version` workspaces to get the latest version of the design-system we are attempting to update to
 */
const getNewDesignSystemVersion = (): string => {
  const newDesignSystemVersionJSON = JSON.parse(sh(`npm version -w @cmsgov/design-system --json`));
  return newDesignSystemVersionJSON['@cmsgov/design-system'];
};

/*
 * Set the @cmsgov/design-system dependency to the new version in each child design system and example package
 */
const updateDSVersion = (json: JSON | any, newVersionNumber: string): JSON => {
  const dsKey = '@cmsgov/design-system';
  json.dependencies[dsKey] = newVersionNumber;
  return json;
};

/*
 * Utilize `npm ls` to get all members of our design system workspace in JSON format.
 * This allows us to dynamically update our child package.json files later on
 *  rather than explicitly enumerating our examples and child design systems.
 * The info we want (member name and package.json file location) are at different levels in the JSON,
 *  so we have to dig a bit.
 * We grab the package names by getting all of the keys in the object associated with the 'dependencies' key.
 * We loop over the names to get the package.json file locations that are in the object associated with the 'resolved' key.
 */
const getPackageNamesAndLocations = (): Array<{
  packageName: string;
  packageLocation: string;
}> => {
  const packageJson: any = JSON.parse(sh('npm ls -ws @cmsgov/design-system --json'));
  const deps = packageJson['dependencies'];
  const packageNames = Object.keys(deps);
  return packageNames.map((name: any) => {
    /*
     * The package location is stored relative to the root directory when returned by `npm ls`,
     * so we have to clean it up a bit so `path` knows where to look.
     */
    const cleanedPackageLocation = deps[name]['resolved'].split('file:')[1].replaceAll('../', '');
    return { packageName: name, packageLocation: cleanedPackageLocation };
  });
};

/*
 * Actually does the updating of the package.json files.
 * Gets the file location, reads said file, bumps the version, writes the file.
 */
const bumpPackageJsonDependencies = (
  {
    packageName,
    packageLocation,
  }: {
    packageName: string;
    packageLocation: string;
  },
  newVersionNumber: string
): void => {
  const jsonFileLocation = path.join(root, packageLocation, 'package.json');
  const json = readJson(jsonFileLocation);
  const updatedJson = updateDSVersion(json, newVersionNumber);
  writeJson(jsonFileLocation, updatedJson);
  console.log(c.green(`Bumped ${packageName} to @cmsgov/design-system@${newVersionNumber}.`));
};

// This function kicks off everything.
export const updateChildDSAndExamples = (): void => {
  const allOurPackages = getPackageNamesAndLocations();
  const newVersionNumber = getNewDesignSystemVersion();
  allOurPackages.forEach((childPackage) => {
    bumpPackageJsonDependencies(childPackage, newVersionNumber);
  });
};
