import { test, expect } from 'vitest';
import { getByText } from '@testing-library/react';
import React from 'react';
import '../../packages/design-system/src/components/web-components/index';
import { createTestRenderer } from '../../packages/design-system/src/components/web-components/__tests__/rendering';


const renderAlert = createTestRenderer('ds-alert', (attrs = {}) => (
  <ds-alert {...attrs}>'Warning: This is an alert!'</ds-alert>
));
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': any;
    }
  }
}
/* eslint-enable */

test('renders the ds-alert component with text in real browser', async () => {
  const heading = 'Error';
  const { shadowRoot } = renderAlert({ heading });
  if (!shadowRoot) {
    throw new Error('shadowRoot is not available');
  }

  console.log('shadow root inside the test', shadowRoot);
  // const alertBody = shadowRoot.querySelector('.ds-c-alert__body');
  // expect(alertBody).not.toBeNull();
  // expect(alertTextElement?.textContent).toContain(heading);

});