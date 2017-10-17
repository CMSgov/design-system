// Add polyfills to fix react-element-to-jsx-string IE compatibility. These
// are included in a separate file because they need ran before any other
// code in the bundle to avoid causing issues with React in production mode.
// - github.com/algolia/react-element-to-jsx-string/issues/147
// - github.com/facebook/react/issues/8379#issuecomment-264867090
import 'core-js/fn/array/includes';
import 'core-js/fn/array/fill';
import 'core-js/fn/function/name';
import 'core-js/fn/object/get-own-property-symbols';
import 'core-js/fn/string/includes';

// Polyfills for React 16 compatibility
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';
