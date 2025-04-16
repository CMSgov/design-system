// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import Alert from '../../packages/design-system/src/components/Alert/Alert';

const defaultText = 'Ruhroh';

test('renders alert', async ({ mount }) => {
  const component = await mount(<Alert id="static-id">{defaultText}</Alert>);
  await expect(component).toContainText(defaultText);
});
