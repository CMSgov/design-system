import { expect, test } from '@playwright/experimental-ct-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-button': any;
    }
  }
}
/* eslint-enable */

const defaultProps = {
  children: 'Foo',
};

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    import('../../packages/design-system/src/components/web-components/index');
  });
});

test('renders ds-button', async ({ mount }) => {
  const component = await mount(<ds-button {...defaultProps}></ds-button>);
  await expect(component).toContainText('Foo');
});

// test('fires a custom ds-click event on click', async ({ mount, page }) => {
//   const component = await mount(<ds-button {...defaultProps}></ds-button>);

//   await page.evaluate(() => {
//     const buttonRoot = document.querySelector('ds-button');
//     if (!buttonRoot) return;

//     (window as any).dsClickFired = false;

//     buttonRoot.addEventListener('ds-click', () => {
//       (window as any).dsClickFired = true;
//     }, { once: true });
//   });

//   await component.click();

//   await page.waitForFunction(() => (window as any).dsClickFired);

//   expect(true).toBe(true);
// });
