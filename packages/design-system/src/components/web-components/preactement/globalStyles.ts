const POLLING_INTERVAL = 10;

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

function isLinkedStyleElement(node: Node): node is HTMLLinkElement {
  return (
    node.nodeType === Node.ELEMENT_NODE &&
    (node as Element).tagName === 'LINK' &&
    (node as HTMLLinkElement).rel === 'stylesheet'
  );
}

/**
 * Create a string that is a relatively cheap to calculate but a fair representation of
 * the document stylesheets so we can compare at the next poll interval and detect
 * changes.
 */
function createStyleSheetSnapshot(): string {
  return Array.from(document.styleSheets)
    .map((sheet) =>
      isLinkedStyleElement(sheet.ownerNode)
        ? sheet.ownerNode.href
        : sheet.cssRules[0]?.cssText ?? ''
    )
    .join(',');
}

function watchForFutureChanges() {
  let stylesheetSnapshot = createStyleSheetSnapshot();
  setInterval(() => {
    const currentSnapshot = createStyleSheetSnapshot();
    if (currentSnapshot !== stylesheetSnapshot) {
      updateStyles();
      stylesheetSnapshot = currentSnapshot;
    }
  }, POLLING_INTERVAL);
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
