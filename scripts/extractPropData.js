const docgen = require('react-docgen-typescript');
const path = require('path');
const { access, writeFile } = require('fs/promises');
const { constants } = require('fs');
const { marked } = require('marked');

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

function getOutputFilename(rootPath) {
  const parts = rootPath.split('/');
  const packageName = parts[parts.length - 1];
  return `props-${packageName}.json`;
}

async function extractData(fileName) {
  // Will throw if this file doesn't exist
  await access(fileName, constants.R_OK);

  const components = customParser.parse(fileName);
  const componentMap = {};

  for (const component of components) {
    const props = Object.values(component.props).map(
      ({ defaultValue, description, name, required, type }) => ({
        defaultValue: defaultValue?.value,
        description,
        name,
        required,
        type: type.name,
      })
    );
    componentMap[component.displayName] = props;
  }

  return componentMap;
}

function parseMarkdown(data) {
  for (const props of Object.values(data)) {
    for (const prop of props) {
      if (prop.description) {
        prop.description = marked.parseInline(prop.description);
      }
    }
  }
}

const corePackage = path.join('packages', 'design-system');
module.exports = async function (rootPath = corePackage) {
  const outputPath = path.join('packages', 'docs', 'data', getOutputFilename(rootPath));
  const inputPath = path.join(rootPath, 'src', 'components', 'index.ts');
  const coreInputPath = path.join(corePackage, 'src', 'components', 'index.ts');
  const coreData = await extractData(coreInputPath);
  let packageData;

  if (rootPath === corePackage) {
    packageData = coreData;
  } else {
    // If this isn't core, we want to deduplicate definitions between this package
    // and core so we're not importing as much data into our Gatsby component.
    packageData = await extractData(inputPath);
    for (const key in packageData) {
      if (coreData[key]) {
        delete packageData[key];
      }
    }
  }

  parseMarkdown(packageData);
  await writeFile(outputPath, JSON.stringify(packageData, null, 2));
};
