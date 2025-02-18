import { test, expect } from '@playwright/experimental-ct-react17';
import React from 'react';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': any;
    }
  }
}
/* eslint-enable */

const defaultText = 'Ruhroh';
const slotHeading = <span slot="heading">Heading</span>;

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    import('../../packages/design-system/src/components/web-components/index');
  });
});

test('renders button', async ({ mount }) => {
  const component = await mount(<ds-alert>{defaultText}</ds-alert>);
  await expect(component).toContainText('Ruhroh');
});

test('renders error variation', async ({ mount }) => {
  const component = await mount(<ds-alert variation="error">{defaultText}</ds-alert>);
  await expect(component).toHaveAttribute('variation', 'error');
});

test('renders slot content', async ({ mount }) => {
  const component = await mount(<ds-alert variation="success">{slotHeading}</ds-alert>);
  await expect(component).toHaveAttribute('variation', 'success');
  await expect(component).toContainText('Heading');
});
