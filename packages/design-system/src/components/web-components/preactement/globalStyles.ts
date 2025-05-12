const POLLING_INTERVAL = 10;
// We poll once every 10 milliseconds, which means we observe 100 times per second
// The max to hit over a 30 second period = 30 seconds * 100 observes per second = 3000 observations
const MAX_OBSERVATIONS = 3000;

let observations = 0;
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
  return Array.from(document.styleSheets).map((documentSheet) => {
    const sheet = new CSSStyleSheet();
    try {
      const css = Array.from(documentSheet.cssRules)
        .map((rule) => rule.cssText)
        .join(' ');
      sheet.replaceSync(css);
      return sheet;
    } catch (error) {
      console.warn(
        `Could not copy global stylesheets. See following error: \n ${error?.message ?? error}`
      );
    }
  });
}

function isLinkElement(node: Node): node is HTMLLinkElement {
  return node?.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'LINK';
}

/**
 * Create a string that is a relatively cheap to calculate but a fair representation of
 * the document stylesheets so we can compare at the next poll interval and detect
 * changes. It's not enough to just check the number of stylesheets because of situations
 * like our Storybook where we just change the `href` attribute of an existing `link` el.
 */
function createStyleSheetSnapshot(): string {
  return Array.from(document.styleSheets)
    .map((sheet) =>
      isLinkElement(sheet.ownerNode) ? sheet.ownerNode.href : sheet.cssRules[0]?.cssText ?? ''
    )
    .join(',');
}

/**
 * We want to keep the shadow DOMs up-to-date with the global styles even if dynamic
 * changes are made later or if stylesheets added right before our initial copy haven't
 * actually finished loading.
 */
function watchForFutureChanges() {
  let stylesheetSnapshot = createStyleSheetSnapshot();
  const observationIntervalId = setInterval(() => {
    const currentSnapshot = createStyleSheetSnapshot();
    if (currentSnapshot !== stylesheetSnapshot) {
      updateStyles();
      stylesheetSnapshot = currentSnapshot;
      observations = 0;
    } else {
      observations += 1;
      if (observations >= MAX_OBSERVATIONS) {
        clearInterval(observationIntervalId);
      }
    }
  }, POLLING_INTERVAL);
}

function updateStyles() {
  globalSheets = copyGlobalStyleSheets();
  updateSubscribers(globalSheets);
}

function updateSubscribers(newSheets: CSSStyleSheet[]) {
  for (const subscriber of subscribers) {
    subscriber.adoptedStyleSheets = newSheets;
  }
}

/**
 * Applies the current global styles to the given shadow root and subscribes to future
 * changes to the global stylesheets. Don't forget to unsubscribe when the web component
 * is disconnected by calling `unsubscribeFromGlobalStyleChanges` or else our reference
 * to it here will keep garbage collection from being able to remove it from memory.
 */
export function subscribeToGlobalStyleChanges(shadowRoot: ShadowRoot) {
  shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
  subscribers.push(shadowRoot);
}

export function unsubscribeFromGlobalStyleChanges(shadowRoot: ShadowRoot) {
  subscribers = subscribers.filter((subscriber) => subscriber !== shadowRoot);
}
