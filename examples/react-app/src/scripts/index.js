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
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  return (
    <div>
      <Alert heading="Hello world">
        <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
        <Button className="ds-u-margin-top--2" onClick={openDialog}>
          Learn more
        </Button>

        <Dialog open={open} onExit={closeDialog} type="modal">
          foo
        </Dialog>
      </Alert>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
