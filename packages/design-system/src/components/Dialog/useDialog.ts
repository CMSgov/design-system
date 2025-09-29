import { useRef, useState } from 'react';

export interface UseDialogRenderProps<ReturnType> {
  isOpen: boolean;
  resolveClose: (returnValue: ReturnType) => any;
}

/**
 * The `useDialog` hook provides an alternative imperative interface for managing the
 * open state of a modal dialog and waiting asynchronously for the final result of the
 * user's interaction with the modal. You pass it a render function for the dialog,
 * and it returns the rendered dialog and a function for opening the dialog and getting
 * back a resolution when the dialog is closed. Please see the Storybook example for
 * more information.
 *
 * Note that you need to render the returned `dialog` element even if it's not open at
 * the moment. It needs to be in the DOM in order for the browser and assistive tech to
 * be able to properly interact with it.
 *
 * Note also that you're in complete control over what value the `openDialog` promise
 * resolves to by what you pass to the `resolveClose` function in your render function.
 */
export function useDialog<ReturnType = any>(
  renderDialog: (renderProps: UseDialogRenderProps<ReturnType>) => React.ReactElement
) {
  const [isOpen, setIsOpen] = useState(false);
  const resolveRef = useRef<(returnValue: ReturnType) => any>(null);

  const resolveClose = (returnValue: ReturnType) => {
    setIsOpen(false);
    resolveRef.current?.(returnValue);
  };

  const dialog = renderDialog({
    isOpen,
    resolveClose,
  });

  function openDialog() {
    setIsOpen(true);
    return new Promise<ReturnType>((resolve) => {
      resolveRef.current = resolve;
    });
  }

  return { dialog, openDialog };
}
