import { test, expect } from '@playwright/test';
import { stories as storiesObject } from '../../storybook-static/stories.json';

const docs = Object.values(storiesObject).filter((story) => story.name === 'Docs');

test.describe('Docs', () => {
  docs.forEach((doc) => {
    test.describe(`${doc.title}/${doc.name}`, () => {
      const docUrl = `http://localhost:6006/iframe.html?viewMode=docs&id=${doc.id}`;

      test('prop table matches snapshot', async ({ page }, workerInfo) => {
        test.skip(workerInfo.project.name !== 'chromium', 'Only need to run these in one browser');

        await page.goto(docUrl);

        const argsData: string[][] = [];
        const argsTable = page.locator('.docblock-argstable');

        // Not all doc pages have an args table, but we should wait a bit to see if one loads
        try {
          await argsTable.waitFor({ timeout: 500 });
          const rows = await argsTable.locator('tr').all();
          for (const row of rows) {
            const cells = await row.locator('td').all();
            if (cells.length) {
              const rowData: string[] = [];
              for (const cell of cells) {
                rowData.push(await cell.innerText());
              }
              argsData.push(rowData);
            }
          }
          await expect(JSON.stringify(argsData, null, 2)).toMatchSnapshot();
        } catch (e) {
          await expect('no args table').toMatchSnapshot();
        }
      });
    });
  });
});
