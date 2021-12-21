import { Button, Dialog , setDialogSendsAnalytics } from '@cmsgov/design-system';
import React, { useState } from 'react';


setDialogSendsAnalytics(true);

declare global {
  interface Window {
    utag: any;
  }
}

window.utag = {
  link: console.log,
};

function ModalDialogExample(): React.ReactElement {
  const [showExampleModal, setShowExampleModal] = useState(false);
  return (
    <div>
      <h2>Modal Dialog Example</h2>
      <Button onClick={() => setShowExampleModal(true)} size="big" variation="primary">
        Click to show modal
      </Button>

      {showExampleModal && (
        <Dialog
          onExit={() => setShowExampleModal(false)}
          getApplicationNode={() => document.getElementById('App')}
          heading="Dialog heading"
          actions={[
            <button className="ds-c-button ds-c-button--primary ds-u-margin-right--1" key="primary">
              Dialog action
            </button>,
            <button
              className="ds-c-button ds-c-button--transparent"
              key="cancel"
              onClick={() => setShowExampleModal(false)}
            >
              Cancel
            </button>,
          ]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
          lacinia, eget tempor purus placerat.
        </Dialog>
      )}
    </div>
  );
}

export default ModalDialogExample;
