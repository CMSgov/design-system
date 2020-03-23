const path = require('path');

const CORE_PACKAGE_NAME = '@cmsgov/design-system';

const REACT_DATA_DIR = `tmp/data`;
const REACT_DATA_FILENAME  = 'react-doc.json';
const REACT_DATA_PATH = path.resolve(REACT_DATA_DIR, REACT_DATA_FILENAME);

module.exports = { 
  CORE_PACKAGE_NAME,
  REACT_DATA_DIR,
  REACT_DATA_FILENAME,
  REACT_DATA_PATH
};
