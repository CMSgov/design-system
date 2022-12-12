const docgen = require('react-docgen-typescript');
const path = require('path');
const { access, constants, writeFile } = require('fs/promises');

const config = {
  savePropValueAsString: true,
  propFilter: (prop, component) => {
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes('node_modules');
      });

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
};

const customParser = docgen.withCustomConfig('./tsconfig.json', config);

module.exports = async function (packageName) {
  if (typeof packageName !== 'string') {
    throw new Error('Must provide a packageName');
  }

  const outputPath = path.join('packages', 'docs', 'data', `props-${packageName}.json`);
  const inputPath = path.join('packages', packageName, 'src', 'components', 'index.ts');

  // Will throw if this file doesn't exist
  await access(inputPath, constants.R_OK);

  const components = customParser.parse(inputPath);
  const componentMap = {};

  for (const component of components) {
    const data = {
      displayName: component.displayName,
      props: Object.values(component.props).map(
        ({ defaultValue, description, name, required, type }) => ({
          defaultValue: defaultValue?.value,
          description,
          name,
          required,
          type: type.name,
        })
      ),
    };
    componentMap[data.displayName] = data;
  }

  await writeFile(outputPath, JSON.stringify(componentMap, null, 2));
};
