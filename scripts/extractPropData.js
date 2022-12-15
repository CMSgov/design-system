const docgen = require('react-docgen-typescript');
const path = require('path');
const { mkdir, writeFile } = require('fs/promises');
const { existsSync } = require('fs');
const { marked } = require('marked');

const customParser = docgen.withCustomConfig('./tsconfig.json', {
  savePropValueAsString: true,
  propFilter: (prop) => {
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes('node_modules');
      });

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
});

async function extractData(input) {
  const components = customParser.parse(input);
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

async function run() {
  const outputDir = path.join('packages', 'docs', 'data');
  const outputPath = path.join(outputDir, 'propData.json');
  const inputPaths = [
    path.join('packages', 'ds-medicare-gov', 'src', 'components', 'index.ts'),
    path.join('packages', 'ds-healthcare-gov', 'src', 'components', 'index.ts'),
    path.join(
      'packages',
      'design-system',
      'src',
      'components',
      'VerticalNav',
      'VerticalNavItem.tsx'
    ),
    path.join('packages', 'design-system', 'src', 'components', 'index.ts'),
  ];
  const propData = await extractData(inputPaths);

  parseMarkdown(propData);

  if (!existsSync(outputDir)) {
    await mkdir(outputDir);
  }
  await writeFile(outputPath, JSON.stringify(propData, null, 2));
}

run();
