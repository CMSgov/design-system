import { test, expect } from '@playwright/test';

const DOMAIN = 'http://localhost:8080';

function testCdnExample(exampleName: string) {
  test.describe(exampleName, () => {
    test('matches snapshot', async ({ page }) => {
      // Wait until network idle so we're sure to get the fonts
      await page.goto(`${DOMAIN}/${exampleName}`, { waitUntil: 'networkidle' });
      await expect(page).toHaveScreenshot(`${exampleName}.png`, { fullPage: true });
    });
  });
}

testCdnExample('cdn-html-css');
testCdnExample('cdn-preact');
testCdnExample('cdn-react');
testCdnExample('cdn-web-components');

test.describe('preact-app', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/preact-app`);
    await expect(page).toHaveScreenshot('preact-app.png', { fullPage: true });
  });
});

test.describe('preact-react-app', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/preact-react-app`);
    await expect(page).toHaveScreenshot('preact-react-app.png', { fullPage: true });
  });
});

test.describe('react-app', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/react-app`);
    await expect(page).toHaveScreenshot('react-app.png', { fullPage: true });
  });
});

test.describe('astro', () => {
  test('react page matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/astro/dist/react`);
    await expect(page).toHaveScreenshot('astro-react.png', { fullPage: true });
  });

  test('core web-components page matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/astro/dist/web-components/core`);
    await expect(page).toHaveScreenshot('astro-web-components.png', { fullPage: true });
  });

  // test('healthcare web-components page matches snapshot', async ({ page }) => {
  //   await page.goto(`${DOMAIN}/astro/dist/web-components/healthcare`);
  //   await expect(page).toHaveScreenshot('astro-healthcare-web-components.png', { fullPage: true });
  // });

  // test('medicare web-components page matches snapshot', async ({ page }) => {
  //   await page.goto(`${DOMAIN}/astro/dist/web-components/medicare`);
  //   await expect(page).toHaveScreenshot('astro-medicare-web-components.png', { fullPage: true });
  // });

  // test('cmsgov web-components page matches snapshot', async ({ page }) => {
  //   await page.goto(`${DOMAIN}/astro/dist/web-components/cmsgov`);
  //   await expect(page).toHaveScreenshot('astro-cmsgov-web-components.png', { fullPage: true });
  // });
});
