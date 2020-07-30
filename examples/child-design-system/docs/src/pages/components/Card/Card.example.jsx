// CMSDS scripts uses webpack's `alias` resolve option to allow for this shorthand import
// https://webpack.js.org/configuration/resolve/#resolvealias
//
// Because the react example files are located separately from the design system source directory (`sourceDir` in `cmsds.config.js`),
// We provide the `@src` alias to allow for easy imports from `sourceDir`
// This is also possible in typescript child design systems via the `paths` compiler option in the `tsconfig.json`
import Card from '@src/components/Card/Card';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Card>Default Card</Card>, document.getElementById('js-example'));
