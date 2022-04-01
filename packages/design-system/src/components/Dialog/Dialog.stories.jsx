import React, { useRef } from 'react';
import { Dialog as DialogComponent } from './Dialog';
import Button from '../Button/Button';

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
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
  const dialogRef = useRef(null);

  return (
    <>
      <Button onClick={() => dialogRef.current.showModal()} size="big" variation="primary">
        Click to show modal
      </Button>

      <DialogComponent ref={dialogRef}>Foo</DialogComponent>
    </>
  );
};
