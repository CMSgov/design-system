import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Alert } from '../../packages/design-system/src/components/index';

test('renders the Alert component with text in real browser', async () => {
  // Use @testing-library/react's render() instead of ReactDOM.render()
  render(<Alert headingLevel="2">Warning: This is an alert!</Alert>);

  const alertText = await screen.findByText('Warning: This is an alert!');
  
  expect(alertText).toBeInTheDocument();
});

