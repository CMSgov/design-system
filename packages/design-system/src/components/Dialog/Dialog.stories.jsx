import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Dialog as DialogComponent } from './Dialog';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal Dialog',
  component: DialogComponent,
  argTypes: {
    children: { control: false },
  },
  args: {
    actions: [
      // adding onClick params here causes unexpected consequences, don't do it
      <button className="ds-c-button ds-c-button--primary ds-u-margin-right--1" key="primary">
        Dialog action
      </button>,
      <button className="ds-c-button ds-c-button--transparent" key="cancel">
        Cancel
      </button>,
    ],
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
  },
};

export const ModalDialog = ({ ...args }) => {
  const [{ shown }, setShown] = useArgs();
  const showModal = () => setShown({ shown: true });
  const hideModal = () => setShown({ shown: false });

  console.log(args.page);

  return (
    <>
      <Button onClick={showModal} size="big" variation="primary">
        Click to show modal
      </Button>

      {shown && (
        <DialogComponent
          {...args}
          getApplicationNode={() => document.getElementById('Wr')}
          onExit={hideModal}
        />
      )}
    </>
  );
};
