/**
 * This polyfill originally came from https://github.com/GoogleChrome/dialog-polyfill/,
 * but we've stripped it down to only what we need to not crash SSR environments that
 * do not yet support the dialog element.
 */

/**
 * Add shims for dialog functions and properties to the provided element object.
 */
function addDialogProperties(dialog: any) {
  // Set a11y role. Browsers that support dialog implicitly know this already.
  if (!dialog.hasAttribute('role')) {
    dialog.setAttribute('role', 'dialog');
  }

  const noop = () => {};
  dialog.show = noop;
  dialog.showModal = noop;
  dialog.close = noop;

  if (!('returnValue' in dialog)) {
    dialog.returnValue = '';
  }

  Object.defineProperty(dialog, 'open', {
    set: noop,
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
