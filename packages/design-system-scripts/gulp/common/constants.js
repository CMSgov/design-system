const path = require('path');

const CORE_SOURCE_PACKAGE = '@cmsgov/design-system';
const CORE_DOCS_PACKAGE = '@cmsgov/cms-design-system-docs';

const REACT_DATA_DIR = `tmp/data`;
const REACT_PROP_DATA_FILENAME = 'react-prop.json';
const REACT_EXAMPLE_DATA_FILENAME = 'react-example.json';
const REACT_PROP_DATA_PATH = path.resolve(REACT_DATA_DIR, REACT_PROP_DATA_FILENAME);
const REACT_EXAMPLE_DATA_PATH = path.resolve(REACT_DATA_DIR, REACT_EXAMPLE_DATA_FILENAME);

module.exports = {
  CORE_SOURCE_PACKAGE,
  CORE_DOCS_PACKAGE,
  REACT_DATA_DIR,
  REACT_PROP_DATA_FILENAME,
  REACT_EXAMPLE_DATA_FILENAME,
  REACT_PROP_DATA_PATH,
  REACT_EXAMPLE_DATA_PATH,
};
