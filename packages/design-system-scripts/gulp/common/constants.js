const path = require('path');

const CORE_SOURCE_PACKAGE = '@cmsgov/design-system';
const CORE_DOCS_PACKAGE = '@cmsgov/design-system-docs';

const REACT_DATA_DIR = `tmp/data`;
const REACT_DATA_FILENAME = 'react-doc.json';
const REACT_DATA_PATH = path.resolve(REACT_DATA_DIR, REACT_DATA_FILENAME);

module.exports = {
  CORE_SOURCE_PACKAGE,
  CORE_DOCS_PACKAGE,
  REACT_DATA_DIR,
  REACT_DATA_FILENAME,
  REACT_DATA_PATH,
};
