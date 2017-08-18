// Add polyfills to fix react-element-to-jsx-string IE compatibility. These
// are included in a separate file because they need ran before any other
// code in the bundle to avoid causing issues with React in production mode.
// - github.com/algolia/react-element-to-jsx-string/issues/147
// - github.com/facebook/react/issues/8379#issuecomment-264867090
require('core-js/fn/array/includes');
require('core-js/fn/array/fill');
require('core-js/fn/function/name');
require('core-js/fn/object/get-own-property-symbols');
require('core-js/fn/string/includes');
