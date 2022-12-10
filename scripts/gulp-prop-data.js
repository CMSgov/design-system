const docgen = require('react-docgen-typescript');
const fs = require('fs');
const through = require('through2');

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

module.exports = function (propsFileName) {
  if (typeof propsFileName !== 'string') {
    throw new Error('Must provide a filename to gulp-prop-data');
  }

  const writeStream = fs.createWriteStream(propsFileName, { flags: 'w' });
  writeStream.write('[\n');

  function processTsFile(tsFile, enc, cb) {
    const components = customParser.parse(tsFile.path);
    for (const component of components) {
      const data = {
        displayName: component.displayName,
        filePath: component.filePath,
        props: Object.values(component.props).map(
          ({ defaultValue, description, name, required, type }) => ({
            defaultValue,
            description,
            name,
            required,
            type: type.name,
          })
        ),
      };
      writeStream.write(JSON.stringify(data, null, 2) + ',\n');
    }
    cb();
  }

  function endStream(cb) {
    writeStream.write(']\n');
    writeStream.end();
    cb();
  }

  return through.obj(processTsFile, endStream);
};
