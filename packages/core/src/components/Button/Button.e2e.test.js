/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.button/`;
const primaryURL = `${ROOT_URL}/example/components.button..ds-c-button--primary/`;
const transparentURL = `${ROOT_URL}/example/components.button..ds-c-button--transparent/`;
const dangerURL = `${ROOT_URL}/example/components.button..ds-c-button--danger/`;
const successURL = `${ROOT_URL}/example/components.button..ds-c-button--success/`;
const disabledURL = `${ROOT_URL}/example/components.button.disabled/`;

describe('Button component', () => {
  it('Button should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-button');
    expect(el).toBeTruthy();
  });

  it('Button should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });

  it('Primary button should have no accessibility violations', async() => {
    await assertNoAxeViolations(primaryURL);
  });

  it('Transparent button should have no accessibility violations', async() => {
    await assertNoAxeViolations(transparentURL);
  });

  it('Danger button should have no accessibility violations', async() => {
    await assertNoAxeViolations(dangerURL);
  });

  it('Success button should have no accessibility violations', async() => {
    await assertNoAxeViolations(successURL);
  });

  it('Disabled button should have no accessibility violations', async() => {
    await assertNoAxeViolations(disabledURL);
  });
});
