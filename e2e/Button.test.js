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

  it('default button example should match snapshot', async() => {
    await gotoExample(page, 'components.button');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('primary button example should match snapshot', async() => {
    await gotoExample(page, 'components.button..ds-c-button--primary');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('transparent button example should match snapshot', async() => {
    await gotoExample(page, 'components.button..ds-c-button--transparent');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('danger button example should match snapshot', async() => {
    await gotoExample(page, 'components.button..ds-c-button--danger');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('success button example should match snapshot', async() => {
    await gotoExample(page, 'components.button..ds-c-button--success');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('disabled button example should match snapshot', async() => {
    await gotoExample(page, 'components.button.disabled');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it('inverse button example should match snapshot', async() => {
    await gotoExample(page, 'components.button.inverse');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
