// TODO(sawyer): Do something with this script in production or get rid of it.
// One thing that would be useful for development is re-rendering the page on
// the client-side with React. This would make debugging the React components
// much easier.

// Enable Webpack hot reloading and tota11y in dev mode
if (module.hot) {
  require('tota11y/build/tota11y.min.js');
  module.hot.accept();
}
