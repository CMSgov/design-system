// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';

// A requestAnimationFrame shim may not be needed if it's added to Jest or JSDom
// https://github.com/facebook/jest/issues/4545
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
}
