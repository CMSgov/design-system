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

function isStyleElement(node: Node): node is HTMLStyleElement {
  return node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'STYLE';
}

function isLinkedStyleElement(node: Node): node is HTMLLinkElement {
  return (
    node.nodeType === Node.ELEMENT_NODE &&
    (node as Element).tagName === 'LINK' &&
    (node as HTMLLinkElement).rel === 'stylesheet'
  );
}

function watchForFutureChanges() {
  const observer = new MutationObserver((allMutations: MutationRecord[]) => {
    console.log('Observing changes to doc head');
    const mutations = allMutations.filter((mutation) => mutation.type === 'childList');

    // Update styles immediately if inline `<style>` elements were added or removed
    const hasImmediateStyleChanges = mutations.some((mutation) =>
      [...mutation.addedNodes, ...mutation.removedNodes].some(isStyleElement)
    );
    if (hasImmediateStyleChanges) {
      updateStyles();
    }

    // Look for new `<link rel="stylesheet">` elements so we can wait for their load event
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (isLinkedStyleElement(node)) {
          updateOnLinkLoad(node);
        }
      }
    }
  });

  observer.observe(document.head, { childList: true });

  // Listen for stylesheets that have yet to load on existing `link` elements
  Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).forEach(updateOnLinkLoad);
}

function updateOnLinkLoad(el: HTMLLinkElement) {
  console.log('listening to load events on ', el);
  el.addEventListener('load', updateStyles);
  el.addEventListener('error', console.log);
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
