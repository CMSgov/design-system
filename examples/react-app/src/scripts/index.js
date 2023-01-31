// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.

import { Alert, Button, Drawer, UsaBanner } from '@cmsgov/design-system';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Example = function () {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <UsaBanner />
      <header className="ds-base--inverse ds-u-padding-y--3">
        <div className="ds-l-container">
          <span className="ds-h3">ExampleWebsite.gov</span>
        </div>
      </header>

      <div className="ds-l-container ds-u-padding-top--2">
        <div className="ds-u-measure--base">
          <h1 className="ds-h1">React Example</h1>
          <Alert heading="Hello world">
            <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
            {open && (
              <Drawer
                footerTitle="Footer Title"
                footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
                heading="Drawer Heading"
                onCloseClick={() => setOpen(false)}
                hasFocusTrap={true}
              >
                Test
              </Drawer>
            )}
            <Button onClick={() => setOpen(true)} className="ds-u-margin-top--2">
              Learn more
            </Button>
          </Alert>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
