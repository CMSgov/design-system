/* eslint-disable react/display-name */
import Dialog from './Dialog';
import React from 'react';

let showDialog = false;

export default function() {
  return (
    <div>
      {showDialog && (
        <Dialog
          onExit={() => {
            console.log('Exit Dialog');
            showDialog = false;
          }}
          getApplicationNode={() => document.querySelector('#js-root')}
          title="Dialog title"
          actions={[
            <button className="ds-c-button ds-c-button--primary" key="primary">
              Dialog action
            </button>,
            <button
              className="ds-c-button ds-c-button--transparent"
              key="cancel"
            >
              Cancel
            </button>
          ]}
        >
          Hello world
        </Dialog>
      )}
    </div>
  );
}
