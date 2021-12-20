import React, { useState } from 'react';
import { Dialog as DialogComponent } from './Dialog';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal Dialog',
  component: DialogComponent,
  argTypes: {
    children: { control: false },
    actions: { control: false },
  },
  args: {
    alert: false,
    analytics: false,
    escapeExits: true,
    underlayClickExits: true,
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Dialog = ({ ...args }) => {
  const [shown, setShown] = useState();
  const showModal = () => setShown(true);
  const hideModal = () => setShown(false);

  return (
    <>
      <Button onClick={showModal} size="big" variation="primary">
        Click to show modal
      </Button>

      {shown && (
        <DialogComponent
          {...args}
          getApplicationNode={() => document.getElementById('storybook-preview-iframe')}
          onExit={hideModal}
          actions={
            <>
              <button
                className="ds-c-button ds-c-button--primary ds-u-margin-right--1"
                key="primary"
              >
                Dialog action
              </button>
              <button
                className="ds-c-button ds-c-button--transparent"
                key="cancel"
                onClick={hideModal}
              >
                Cancel
              </button>
            </>
          }
        />
      )}
    </>
  );
};
