// Import all components and reference one by name. You can optimize this using
// your build process (ie. Tree shaking in Webpack)
import { Alert } from '@cmsgov/design-system-core';
// Import individual component. No special optimizations needed.
import Button from '@cmsgov/design-system-core/dist/components/Button/Button';
import React from 'react';
import ReactDOM from 'react-dom';

const Example = function() {
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
