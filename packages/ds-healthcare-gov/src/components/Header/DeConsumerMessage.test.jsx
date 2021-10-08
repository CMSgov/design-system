import DeConsumerMessage from './DeConsumerMessage';
import React from 'react';
import { shallow } from 'enzyme';

describe('DeConsumerMessage', function () {
  it('renders message with broker name', () => {
    expect(
      shallow(<DeConsumerMessage deBrokerName="Acme Co." />).shallow()
    ).toMatchSnapshot();
  });

  it('renders message with fallback broker name', () => {
    expect(shallow(<DeConsumerMessage />).shallow()).toMatchSnapshot();
  });
});
