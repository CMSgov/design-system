import DeConsumerMessage from './DeConsumerMessage';
import React from 'react';
import { shallow } from 'enzyme';

const t = (key) => key;

describe('DeConsumerMessage', function () {
  it('renders message with broker name', () => {
    expect(
      shallow(<DeConsumerMessage t={t} deBrokerName="Acme Co." />).shallow()
    ).toMatchSnapshot();
  });

  it('renders message with fallback broker name', () => {
    expect(shallow(<DeConsumerMessage t={t} />).shallow()).toMatchSnapshot();
  });
});
