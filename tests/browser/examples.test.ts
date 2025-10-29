import { test } from '@playwright/test';
import { expectScreenshot } from './expectScreenshot';

const DOMAIN = 'http://localhost:8080';
const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

function testCdnExample(exampleName: string) {
  test.describe(exampleName, () => {
    test('matches snapshot', async ({ page }) => {
      // Wait until network idle so we're sure to get the fonts
      await page.goto(`${DOMAIN}/${exampleName}`, { waitUntil: 'networkidle' });
      await expectScreenshot(page, `${exampleName}.png`);
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
    await expectScreenshot(page, 'preact-app.png');
  });
});

test.describe('preact-react-app', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/preact-react-app`);
    await expectScreenshot(page, 'preact-react-app.png');
  });
});

test.describe('react-app', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/react-app`);
    await expectScreenshot(page, 'react-app.png');
  });
});

test.describe('astro', () => {
  test('react page matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/astro/dist/react`);
    await expectScreenshot(page, 'astro-react.png');
  });

  test('web-components page matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/astro/dist/web-components`);
    await expectScreenshot(page, 'astro-web-components.png');
  });
});

if (!isSmokeTest) {
  test.describe('astro-themes', () => {
    test('healthcare web-components page matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-themes/dist/healthcare`);
      await expectScreenshot(page, 'astro-healthcare-web-components.png');
    });

    test('medicare web-components page matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-themes/dist/medicare`);
      await expectScreenshot(page, 'astro-medicare-web-components.png');
    });

    test('cmsgov web-components page matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-themes/dist/cmsgov`);
      await expectScreenshot(page, 'astro-cmsgov-web-components.png');
    });
  });

  test.describe('astro-react-17', () => {
    test('matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-react-17/dist`);
      await expectScreenshot(page, 'astro-react-17.png');
    });
  });

  test.describe('astro-react-18', () => {
    test('matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-react-18/dist`);
      await expectScreenshot(page, 'astro-react-18.png');
    });
  });

  test.describe('astro-react-19', () => {
    test('matches snapshot', async ({ page }) => {
      await page.goto(`${DOMAIN}/astro-react-19/dist`);
      await expectScreenshot(page, 'astro-react-19.png');
    });
  });
}
