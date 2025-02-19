import { test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../packages/design-system/src/components/web-components/index';
// const defaultAttrs = {
//   label: 'Filter Chip!',
//   'root-id': '12345',
//   'class-name': 'ds-not-a-real-class',
// };

test('render filter chip', async () => {
  render(<ds-filter-chip label="Filter Chip!" root-id="12345" class-name="ds-not-a-real-class"></ds-filter-chip>);
  const chipEl = await screen.findByRole('button');
  expect(chipEl?.querySelector('.ds-c-filter-chip__label')?.textContent).toEqual('Filter Chip!');
  expect(chipEl).toMatchSnapshot();
});
