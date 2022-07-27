import React from 'react';
import { render } from '@testing-library/react';
import SvgIcon from './SvgIcon';
import AddIcon from './AddIcon';

describe('SvgIcon', () => {
  const renderSvgIcon = (overrideProps?) => {
    return render(
      <SvgIcon ariaHidden={false} title="test icon" id="test-icon" {...overrideProps}>
        <path />
      </SvgIcon>
    );
  };

  it('passes through additional props', () => {
    const { getByTestId } = renderSvgIcon({ 'data-testid': 'iconTest' });
    const iconEl = getByTestId('iconTest');
    expect(iconEl).toMatchSnapshot();
  });

  it('wrapper icon can pass through additional props', () => {
    const { getByTestId } = render(<AddIcon data-testid="addIconTest" />);
    const iconEl = getByTestId('addIconTest');
    expect(iconEl).toMatchSnapshot();
  });

  describe('when ariaHidden is false', () => {
    it('shows accessibility attributes', () => {
      const { getByRole } = renderSvgIcon();
      const iconEl = getByRole('img');

      expect(iconEl).toBeDefined();
      expect(iconEl.getAttribute('aria-labelledby')).toEqual('test-icon__title');
    });

    it('renders title', () => {
      const { getByTitle } = renderSvgIcon();
      const iconEl = getByTitle('test icon');
      expect(iconEl).toBeDefined();
    });

    it('updates aria-labelledby if description exists', () => {
      const { getByRole } = renderSvgIcon({ description: 'i am a description of the svg' });
      const iconEl = getByRole('img');

      expect(iconEl.getAttribute('aria-labelledby')).toEqual('test-icon__title test-icon__desc');
    });
  });

  describe('when ariaHidden is true', () => {
    it('does not have role="img"', () => {
      const { queryByRole } = renderSvgIcon({ ariaHidden: true });
      const iconEl = queryByRole('img');
      expect(iconEl).toBe(null);
    });

    it('renders without title or description"', () => {
      const { getByTestId } = renderSvgIcon({ ariaHidden: true, 'data-testid': 'testId' });
      const iconEl = getByTestId('testId');
      expect(iconEl).toMatchSnapshot();
    });
  });
});
