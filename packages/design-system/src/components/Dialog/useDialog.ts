import { useRef, useState } from 'react';

export interface UseDialogRenderProps<ReturnType> {
  isOpen: boolean;
  resolveClose: (returnValue: ReturnType) => any;
}

export function useDialog<ReturnType = any>(
  renderDialog: (renderProps: UseDialogRenderProps<ReturnType>) => React.ReactElement
) {
  const [isOpen, setIsOpen] = useState(false);
  const resolveRef = useRef<(returnValue: ReturnType) => any>();

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
