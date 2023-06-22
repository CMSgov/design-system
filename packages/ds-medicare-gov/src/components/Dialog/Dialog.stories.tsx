import React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '@cmsgov/design-system';
import { Button } from '@cmsgov/design-system';

// @TODO: The typing here needs some work, removing any here causes a chain of problems
const meta: Meta<typeof Dialog | any> = {
  title: 'Components/Dialog',
  component: Dialog,
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
    theme: 'medicare',
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const DialogExample: Story = {
  render: function Component(args: any) {
    const [shown, setShown] = useState(false);
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
  },
};
