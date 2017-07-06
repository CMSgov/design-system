const debounce = require('lodash/debounce');

function reportSize() {
  console.log('reportSize');

  window.top.postMessage({
    height: document.body.offsetHeight,
    id: id, // eslint-disable-line no-undef
    name: 'reportSize'
  }, window.location.origin);
}

reportSize();
window.addEventListener('resize', debounce(reportSize, 150));
