// Enable Webpack hot reloading and tota11y in dev mode
if (module.hot) {
  require('tota11y/build/tota11y.min.js');
  module.hot.accept();
}
