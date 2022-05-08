import React, { useRef, useEffect, useLayoutEffect } from 'react';
import dialogPolyfill from './polyfill';

interface NativeDialogProps {
  children: React.ReactNode;
  /**
   * Function called to close dialog.
   */
  exit: any;
  /**
   * Determines which dialog method is called.
   * If true, `showModal()` is called, if false,
   * `show()` is called.
   */
  showModal?: boolean;
  /*
   * @hide-prop Spreading props
   */
  [x: string]: any;
}

const NativeDialog = ({ children, exit, showModal, ...dialogProps }: NativeDialogProps) => {
  const dialogRef = useRef(null);

  useLayoutEffect(() => {
    if (window.HTMLDialogElement === undefined) {
      dialogPolyfill.registerDialog(dialogRef.current);
    }
  });

  useEffect(() => {
    const dialogNode = dialogRef.current;
    showModal ? dialogNode.showModal() : dialogNode.show();

    return () => {
      dialogNode.close();
    };
  }, [showModal]);

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
  }, [exit]);

  return (
    <dialog ref={dialogRef} {...dialogProps}>
      {children}
    </dialog>
  );
};

export default NativeDialog;
