import React, { useRef, useEffect, useLayoutEffect, DialogHTMLAttributes } from 'react';
import dialogPolyfill from './polyfill';

interface NativeDialogProps extends Omit<DialogHTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode;
  backdropClickExits?: boolean;
  /**
   * Function called to close dialog.
   */
  exit: (...args: any[]) => any;
  /**
   * A custom `id` attribute for the dialog element
   */
  id?: string;
  /**
   * Determines which native dialog method is called to open the dialog. If the dialog
   * is opened with `showModal`, focus will be trapped inside the dialog, and it will
   * need to be closed before the rest of the page can be interacted with. See the
   * [`showModal` MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
   * for more details.
   */
  showModal?: boolean;
}

const NativeDialog = ({
  children,
  exit,
  showModal,
  backdropClickExits,
  ...dialogProps
}: NativeDialogProps) => {
  const dialogRef = useRef(null);

  // Register dialog with the polyfill if necessary
  useLayoutEffect(() => {
    // The registerDialog function itself determines if the polyfill needs to be applied
    dialogPolyfill.registerDialog(dialogRef.current);
  });

  // Open and close the dialog with the appropriate method on mount and unmount
  useEffect(() => {
    const dialogNode = dialogRef.current;
    showModal ? dialogNode.showModal() : dialogNode.show();
    return () => {
      dialogNode.close();
    };
  }, [showModal]);

  // Bind and unbind event listeners on mount and unmount
  useEffect(() => {
    const dialogNode = dialogRef.current;

    const handleCancel = (event) => {
      event.preventDefault();
      exit();
    };
    dialogNode.addEventListener('cancel', handleCancel);

    const handleClick = (event) => {
      const rect = dialogNode.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        exit();
      }
    };
    if (backdropClickExits) {
      dialogNode.addEventListener('click', handleClick);
    }

    return () => {
      dialogNode.removeEventListener('cancel', handleCancel);
      if (backdropClickExits) {
        dialogNode.removeEventListener('click', handleClick);
      }
    };
  }, [exit, backdropClickExits]);

  return (
    <dialog ref={dialogRef} {...dialogProps}>
      {children}
    </dialog>
  );
};

export default NativeDialog;
