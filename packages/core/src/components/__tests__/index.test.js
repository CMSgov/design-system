import * as components from '../index';
const fs = require('mz/fs');
const path = require('path');
const componentNames = Object.keys(components);

/**
 * Loop through the components/ subfolders and return the component files from
 * each directory.
 */
function getComponentFilenames(directoryPaths) {
  return Promise.all(
    directoryPaths.map(directoryPath =>
      fs.readdir(directoryPath).then(files =>
        // This gave us all files including tests, examples, and Scss files.
        // We only want the component file though.
        files
          .filter(name => name.match(/^([a-z]+)\.jsx?$/i))
          .map(name => name.replace(/\.jsx?/, ''))
      )
    )
  ).then(nameGroups => {
    let names = [];
    nameGroups.forEach(group => {
      names = names.concat(group);
    });
    return names;
  });
}

/**
 * Look in the components/ directory and return the paths of only the subfolders
 */
function getDirectories(paths) {
  return paths.filter(filePath => fs.lstatSync(filePath).isDirectory());
}

const ignoredComponents = ['Step', 'SubStep', 'StepLink'];

describe('Components index', () => {
  it("exports all components except ones we don't want to expose", () => {
    return fs
      .readdir(path.resolve(__dirname, '../'))
      .then(files => files.map(name => path.resolve(__dirname, `../${name}`)))
      .then(getDirectories)
      .then(getComponentFilenames)
      .then(names => {
        names
          .filter(name => !ignoredComponents.includes(name))
          .forEach(name => {
            expect(componentNames).toEqual(expect.arrayContaining([name]));
          });
      });
  });
});
