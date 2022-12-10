const through = require('through2');

module.exports = function () {
  return through.obj((chunk, enc, cb) => {
    console.log('chunk', chunk.path); // this should log now
    cb(null, chunk);
  });
};
