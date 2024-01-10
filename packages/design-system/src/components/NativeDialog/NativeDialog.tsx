import React from 'react';
import { useRef, useEffect, useLayoutEffect, DialogHTMLAttributes } from 'react';
import dialogPolyfill from './polyfill';

export interface NativeDialogProps extends Omit<DialogHTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode;
  /**
   * Pass `true` to have the dialog close when its backdrop pseudo-element is clicked
   */
  backdropClickExits?: boolean;
  boundingBoxRef?: React.MutableRefObject<any>;
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

/**
 * This is an internal component and may change without warning. Use at your own risk!
 */
export const NativeDialog = ({
  children,
  exit,
  showModal,
  backdropClickExits,
  boundingBoxRef,
  ...dialogProps
}: NativeDialogProps) => {
  const dialogRef = useRef(null);

  // Register dialog with the polyfill if necessary
  useLayoutEffect(() => {
    // The registerDialog function itself determines if the polyfill needs to be applied
    dialogPolyfill.registerDialog(dialogRef.current);
  });

  // Call imperative show and close functions on mount/unmount
  useEffect(() => {
    const dialogNode = dialogRef.current;

    // Show the modal
    showModal ? dialogNode.showModal() : dialogNode.show();

    // Bind close event listener for ESC press
    const handleClose = (event) => {
      event.preventDefault();
      exit(event);
    };
    dialogNode.addEventListener('close', handleClose);

    return () => {
      // Remove the close event handler first, or it will be tripped by our manual close call
      dialogNode.removeEventListener('close', handleClose);

      // It's possible for the element to already be closed, so check first to avoid an error
      if (dialogNode.open) {
        dialogNode.close();
      }
    };
  }, [showModal, exit]);

  // Bind and unbind backdrop click event listeners on mount and unmount
  useEffect(() => {
    if (!backdropClickExits) {
      return;
    }

    const dialogNode = dialogRef.current;
    const handleClick = (event) => {
      const boundingNode = boundingBoxRef?.current ?? dialogRef.current;
      const rect = boundingNode.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        exit();
      }
    };
    dialogNode.addEventListener('click', handleClick);
    return () => {
      dialogNode.removeEventListener('click', handleClick);
    };
  }, [exit, backdropClickExits]);

  return (
    <dialog ref={dialogRef} {...dialogProps}>
      {children}
    </dialog>
  );
};

export default NativeDialog;
