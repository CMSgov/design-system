import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import dialogPolyfill from 'dialog-polyfill';
// Move polyfill CSS to local styles?
// import 'dialog-polyfill/dist/dialog-polyfill.css';

declare const window: any;

// interface NativeDialogProps {}

function NativeDialog({ children, exit, focusTrap, open, ...props }) {
  const dialogRef = useRef(null);
  const firstRender = useRef(true);
  const lastActiveElement = useRef(null);

  // useLayoutEffect(() => {
  //   if (window.HTMLDialogElement === undefined) {
  //     dialogPolyfill.registerDialog(dialogRef.current);
  //   }
  // })

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      const dialogNode = dialogRef.current;
      if (open) {
        lastActiveElement.current = document.activeElement;
        focusTrap ? dialogNode.showModal() : dialogNode.show();
      } else {
        dialogNode.close();
        lastActiveElement.current.focus();
      }
    }
  }, [focusTrap, open]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (event) => {
      event.preventDefault();
      exit();
    };
    dialogNode.addEventListener('cancel', handleCancel);
    return () => {
      dialogNode.removeEventListener('cancel', handleCancel);
    };
  }, [exit, open]);

  return (
    <dialog ref={dialogRef} {...props}>
      {children}
    </dialog>
  );
}

export default NativeDialog;
