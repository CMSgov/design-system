const { promisify } = require('util');
const finished = promisify(require('stream').finished);

function streamPromise(stream) {
  return finished(stream, { readable: false, writeable: false, error: false });
}

module.exports = streamPromise;
