// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import { Alert, Dialog } from '@cmsgov/design-system';
// Default import for individual component. No special optimizations needed.
import Button from '@cmsgov/design-system/dist/components/Button/Button';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Example = function () {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Alert heading="Hello world">
        <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
        <Button className="ds-u-margin-top--2" onClick={() => setOpen(true)}>
          Learn more
        </Button>
      </Alert>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        type="drawer"
        heading="👋 Hi, I'm a dialog!"
      >
        <p>
          This element can be both a Drawer and a Modal depending on the `type` set. If Drawer is
          selected, the background is interactive. If Modal is selected, the background is not
          interactive.
        </p>
        <p>
          You can click the close button or press <kbd>ESCAPE</kbd> to close the dialog.
        </p>
      </Dialog>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
