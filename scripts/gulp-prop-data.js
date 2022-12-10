const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const through = require('through2');
const File = require('vinyl');

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

  // const writeStream = fs.createWriteStream(filename, { flags: 'a' });

  let propsFile;

  function processTsFile(tsFile, enc, cb) {
    // writeStream.write(`${tsFile.path}\n`);
    if (!propsFile) {
      propsFile = new Vinyl({
        cwd: tsFile.cwd,
        base: tsFile.base,
        path: path.join(tsFile.base, propsFileName),
        contents: null,
      });
    }

    propsFile.contents;

    cb();
  }

  function endStream(cb) {
    // writeStream.end();
    cb();
  }

  return through.obj(processTsFile, endStream);
};
