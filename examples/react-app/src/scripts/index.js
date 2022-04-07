// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import { Alert } from '@cmsgov/design-system';
// Default import for individual component. No special optimizations needed.
import Button from '@cmsgov/design-system/dist/components/Button/Button';
import React from 'react';
import ReactDOM from 'react-dom';

import ReactDOMServer from 'react-dom/server';

const staticHtml = ReactDOMServer.renderToStaticMarkup(
  <Alert heading="Status heading">
    <p className="ds-c-alert__text">This is a React Alert component.</p>
  </Alert>
);
console.log(staticHtml);

const Example = function () {
  return (
    <div>
      <Alert heading="Hello world">
        <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
        <Button className="ds-u-margin-top--2">Learn more</Button>
      </Alert>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
