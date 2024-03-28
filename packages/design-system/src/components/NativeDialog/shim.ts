/**
 * This polyfill originally came from https://github.com/GoogleChrome/dialog-polyfill/,
 * but we've stripped it down to only what we need to not crash node environments that
 * do not yet support the dialog element.
 */

/**
 * Add shims for dialog functions and properties to the provided element object.
 */
function addDialogProperties(dialog: any) {
  function handleKey(event) {
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      dialog.close();
    }
  }

  function setOpen(open: boolean) {
    if (open) {
      dialog.hasAttribute('open') || dialog.setAttribute('open', '');
      document.addEventListener('keydown', handleKey);
    } else {
      dialog.removeAttribute('open');
      document.removeEventListener('keydown', handleKey);
    }
  }

  dialog.show = () => setOpen(true);
  dialog.showModal = () => setOpen(true);
  dialog.close = () => {
    setOpen(false);
    const cancelEvent = new CustomEvent('close', {
      bubbles: false,
      cancelable: true,
    });
    dialog.dispatchEvent(cancelEvent);
  };

  // Set a11y role. Browsers that support dialog implicitly know this already.
  if (!dialog.hasAttribute('role')) {
    dialog.setAttribute('role', 'dialog');
  }

  if (!('returnValue' in dialog)) {
    dialog.returnValue = '';
  }

  Object.defineProperty(dialog, 'open', {
    set: setOpen,
    get: dialog.hasAttribute.bind(dialog, 'open'),
  });
}

export function shimDialogElement(element: HTMLDialogElement) {
  if (!element.showModal) {
    if (element.localName !== 'dialog') {
      throw new Error('Failed to polyfill dialog: The element is not a dialog.');
    }
    addDialogProperties(element);
  }
}
