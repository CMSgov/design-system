import DeConsumerMessage from './DeConsumerMessage';
import React from 'react';
import { render } from '@testing-library/react';

const t = (key, data) => key + (data ? ` | ${JSON.stringify(data)}` : '');

describe('DeConsumerMessage', function () {
  it('renders message with broker name', () => {
    const { container } = render(<DeConsumerMessage t={t} deBrokerName="Acme Co." />);
    expect(container).toMatchSnapshot();
  });

  it('renders message with fallback broker name', () => {
    const { container } = render(<DeConsumerMessage t={t} />);
    expect(container).toMatchSnapshot();
  });
});
