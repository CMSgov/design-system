import sortBy from 'lodash/sortBy';
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
        const argsTable = page.locator('.docblock-argstable').first();

        // Not all doc pages have an args table, but we should wait a bit to see if one loads
        try {
          await argsTable.waitFor({ timeout: 1000 });
        } catch (e) {
          await expect('no args table').toMatchSnapshot();
          return;
        }

        const rows = await argsTable.locator('tr').all();
        for (const row of rows) {
          const cells = await row.locator('> td').all();
          if (cells.length) {
            const rowData: string[] = [];
            for (const cell of cells) {
              rowData.push(await cell.innerText());
            }
            argsData.push(rowData);
          }
        }

        // Sort by the arg name so we get consistent results. We don't care about the
        // order they show up in in the docs, so optimize for not having to update
        // snapshots as frequently.
        const sortedData = sortBy(argsData, [0]);
        await expect(JSON.stringify(sortedData, null, 2)).toMatchSnapshot();
      });
    });
  });
});
