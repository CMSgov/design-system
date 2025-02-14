import { test, expect } from '@playwright/experimental-ct-react17';
import React from 'react';
import Button from './Button';

test('renders button', async ({ mount }) => {
  const component = await mount(<Button />);
  await expect(component).toContainText('Click Me');
});
