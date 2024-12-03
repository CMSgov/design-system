let globalSheets: CSSStyleSheet[] | null = null;
let subscribers: ShadowRoot[] = [];

export function getGlobalStyleSheets() {
  if (globalSheets === null) {
    globalSheets = copyGlobalStyleSheets();
    watchForFutureChanges();
  }

  return globalSheets;
}

function copyGlobalStyleSheets(): CSSStyleSheet[] {
  return Array.from(document.styleSheets).map((x) => {
    const sheet = new CSSStyleSheet();
    const css = Array.from(x.cssRules)
      .map((rule) => rule.cssText)
      .join(' ');
    sheet.replaceSync(css);
    return sheet;
  });
}

function nodeIsStylish(node: Node): boolean {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (
    ((node as Element).tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') ||
    (node as Element).tagName === 'STYLE'
  );
}

function watchForFutureChanges() {
  const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
    console.log('Observing changes to doc head');

    const stylesChanged = mutationsList.some(
      (mutation) =>
        (mutation.type === 'childList' && Array.from(mutation.addedNodes).some(nodeIsStylish)) ||
        Array.from(mutation.removedNodes).some(nodeIsStylish)
    );

    if (stylesChanged) {
      updateStyles();
    }
  });

  observer.observe(document.head, { childList: true });

  // The following is really just for our particular Storybook setup, where we change the
  // href attribute of our theme `<link>` element when the user switches themes. We don't
  // expect this to be a common pattern in the real world.
  const hrefAttributeObserver = new MutationObserver((mutationsList) => {
    console.log('observed mutation');
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
        updateStyles();
      }
    }
  });
  Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).forEach((link) => {
    console.log(link);
    hrefAttributeObserver.observe(link, { attributes: true });
  });
}

function updateStyles() {
  console.log('Styles changed');
  globalSheets = copyGlobalStyleSheets();
  updateSubscribers(globalSheets);
}

function updateSubscribers(newSheets: CSSStyleSheet[]) {
  for (const subscriber of subscribers) {
    console.log('updating subscriber');
    subscriber.adoptedStyleSheets = newSheets;
  }
}

export function subscribeToGlobalStyleChanges(shadowRoot: ShadowRoot) {
  shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
  subscribers.push(shadowRoot);
}

export function unsubscribeFromGlobalStyleChanges(shadowRoot: ShadowRoot) {
  subscribers = subscribers.filter((subscriber) => subscriber !== shadowRoot);
}
