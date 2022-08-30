import React, { useState } from 'react';
import Dialog from './Dialog';
import { Button } from '@cmsgov/design-system';

export default {
  title: 'Medicare/Dialog',
  component: Dialog,
  argTypes: {
    analytics: { control: false },
    children: { control: false },
    actions: { control: false },
    heading: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    title: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
  },
  args: {
    alert: false,
    escapeExits: true,
    underlayClickExits: true,
    closeButtonVariation: 'ghost',
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

export const DialogExample = ({ ...args }) => {
  const [shown, setShown] = useState();
  const showModal = () => setShown(true);
  const hideModal = () => setShown(false);

  return (
    <>
      <Button onClick={showModal} size="big" variation="solid">
        Click to show modal
      </Button>

      {shown && (
        <Dialog
          {...args}
          getApplicationNode={() => document.getElementById('storybook-preview-iframe')}
          onExit={hideModal}
          actions={
            <>
              <button className="ds-c-button ds-c-button--solid ds-u-margin-right--1" key="solid">
                Dialog action
              </button>
              <button className="ds-c-button ds-c-button--ghost" key="cancel" onClick={hideModal}>
                Cancel
              </button>
            </>
          }
        />
      )}
    </>
  );
};
