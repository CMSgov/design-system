import React, { useRef, useEffect, useLayoutEffect } from 'react';
import dialogPolyfill from 'dialog-polyfill';

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
  /**
   * Controls visibility of dialog.
   */
  open: boolean;
  // Spreading props
  [x: string]: any;
}

declare const window: any;

function NativeDialog({ children, exit, open, showModal, ...dialogProps }: NativeDialogProps) {
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
        showModal ? dialogNode.showModal() : dialogNode.show();
      } else {
        dialogNode.close();
        lastActiveElement.current.focus();
      }
    }
  }, [open, showModal]);

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
    <dialog open ref={dialogRef} {...dialogProps}>
      {children}
    </dialog>
  );
}

export default NativeDialog;
