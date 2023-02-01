// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import { Alert, Button, Drawer } from '@cmsgov/ds-cms-gov';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Example = function () {
  const [open, setOpen] = useState(false);
  return (
    <div>
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
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
