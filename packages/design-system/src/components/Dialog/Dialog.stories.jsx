import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Dialog as DialogComponent } from './Dialog';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal Dialog',
  component: DialogComponent,
  argTypes: {
    children: { control: false },
    shown: { table: { disable: true } },
  },
  args: {
    alert: false,
    analytics: false,
    escapeExits: true,
    underlayClickExits: false,
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
    shown: true,
  },
};

export const ModalDialog = ({ ...args }) => {
  const [{ shown }, setShown] = useArgs();
  const toggleShown = () => {
    setShown({ shown: !shown });
  };

  return (
    <>
      <Button onClick={toggleShown} size="big" variation="primary">
        Click to show modal
      </Button>

      {shown && (
        <DialogComponent
          {...args}
          getApplicationNode={() => document.getElementById('storybook-preview-wrapper')}
          actions={[
            <button className="ds-c-button ds-c-button--primary ds-u-margin-right--1" key="primary">
              Dialog action
            </button>,
            <button
              className="ds-c-button ds-c-button--transparent"
              key="cancel"
              onClick={toggleShown}
            >
              Cancel
            </button>,
          ]}
          onExit={toggleShown}
        />
      )}
    </>
  );
};
