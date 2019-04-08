/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.badge/`;
const infoURL = `${ROOT_URL}/example/components.badge..ds-c-badge--info/`;
const successURL = `${ROOT_URL}/example/components.badge..ds-c-badge--success/`;
const warnURL = `${ROOT_URL}/example/components.badge..ds-c-badge--warn/`;
const alertURL = `${ROOT_URL}/example/components.badge..ds-c-badge--alert/`;

describe('Badge component', () => {
  it('Badge should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Info badge should render', async() => {
    await driver.get(infoURL);

    const el = await getElementByClassName('ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Success badge should render', async() => {
    await driver.get(successURL);

    const el = await getElementByClassName('ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Warning badge should render', async() => {
    await driver.get(warnURL);

    const el = await getElementByClassName('ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Alert badge should render', async() => {
    await driver.get(alertURL);

    const el = await getElementByClassName('ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Badge should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });

  it('Info badge should have no accessibility violations', async() => {
    await assertNoAxeViolations(infoURL);
  });

  it('Success badge should have no accessibility violations', async() => {
    await assertNoAxeViolations(successURL);
  });

  it('Warning badge should have no accessibility violations', async() => {
    await assertNoAxeViolations(warnURL);
  });

  it('Alert badge should have no accessibility violations', async() => {
    await assertNoAxeViolations(alertURL);
  });
});
