const debounce = require('lodash/debounce');
let height;

/**
 * Send a message to the parent window so it knows what iframe height to set
 */
function reportSize() {
  if (height !== document.body.offsetHeight) {
    height = document.body.offsetHeight;

    window.top.postMessage({
      height: height,
      id: id, // eslint-disable-line no-undef
      name: 'reportSize'
    }, window.location.origin);
  }
}

window.addEventListener('resize', debounce(reportSize, 150));
reportSize();
