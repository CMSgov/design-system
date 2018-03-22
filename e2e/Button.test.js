import { gotoExample, newPage, timeout } from './helpers';

describe('<Button>', () => {
  let page;

  beforeAll(async() => {
    jest.setTimeout(timeout);
  }, timeout);

  beforeEach(async() => {
    page = await newPage();
  });

  afterEach(async() => {
    await page.close();
  });

  it('default button should match snapshot', async() => {
    await gotoExample(page, 'components.button');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
