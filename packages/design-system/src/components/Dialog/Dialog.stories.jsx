import React, { useState, useRef } from 'react';
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
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const modalRef = useRef(null);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        // onClick={() => dialogRef.current.showModal()}
        size="big"
        variation="primary"
      >
        Click to show modal
      </Button>

      <DialogComponent
        // ref={dialogRef}
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
      </DialogComponent>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, excepturi aliquam inventore,
        non rerum maiores tempora laborum ad adipisci aspernatur quas ratione impedit saepe est
        voluptatum soluta facere eaque porro.
      </p>
      <Button
        onClick={() => setOpen(true)}
        // onClick={() => modalRef.current.showModal()}
        size="big"
        variation="primary"
      >
        Click to show other modal
      </Button>
      <DialogComponent
        // ref={modalRef}
        open={open}
        onClose={() => setOpen(false)}
        type="drawer"
        heading="👋 Hi, I'm another dialog!"
      >
        <p>Testing how multiple dialogs appear on a screen.</p>
      </DialogComponent>
      <p>
        This line of text has a <a href="!#  ">link</a> in it to demonstrate how interactivity works
        on elements behind the dialog.
      </p>
    </>
  );
};
