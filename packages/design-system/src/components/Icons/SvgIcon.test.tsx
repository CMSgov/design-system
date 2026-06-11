import { render, screen } from '@testing-library/react';
import { SvgIcon } from './SvgIcon';
import { AddIcon } from './AddIcon';

interface OverrideProps {
  'data-testid'?: string;
  id?: string;
  ariaHidden?: boolean;
  description?: string;
}

describe('SvgIcon', () => {
  const renderSvgIcon = (overrideProps?: OverrideProps) => {
    return render(
      <SvgIcon ariaHidden={false} title="test icon" {...overrideProps}>
        <path />
      </SvgIcon>
    );
  };

  it('passes through additional props', () => {
    renderSvgIcon({ 'data-testid': 'iconTest', id: 'static-id' });
    const iconEl = screen.getByTestId('iconTest');
    expect(iconEl).toMatchSnapshot();
  });

  it('wrapper icon can pass through additional props', () => {
    render(<AddIcon data-testid="addIconTest" />);
    const iconEl = screen.getByTestId('addIconTest');
    expect(iconEl).toMatchSnapshot();
  });

  describe('when ariaHidden is false', () => {
    it('shows accessibility attributes', () => {
      renderSvgIcon({ id: 'static-id' });
      const iconEl = screen.getByRole('img');

      expect(iconEl).toBeDefined();
      expect(iconEl.getAttribute('aria-labelledby')).toEqual('static-id__title');
    });

    it('renders title', () => {
      renderSvgIcon({ id: 'static-id' });
      const iconEl = screen.getByTitle('test icon');
      expect(iconEl).toBeDefined();
    });

    it('updates aria-labelledby if description exists', () => {
      renderSvgIcon({ description: 'i am a description of the svg', id: 'static-id' });
      const iconEl = screen.getByRole('img');

      expect(iconEl.getAttribute('aria-labelledby')).toEqual('static-id__title static-id__desc');
    });
  });

  describe('when ariaHidden is true', () => {
    it('does not have role="img"', () => {
      renderSvgIcon({ ariaHidden: true });
      const iconEl = screen.queryByRole('img');
      expect(iconEl).toBe(null);
    });

    it('does not have an id', () => {
      renderSvgIcon({ 'data-testid': 'testId', ariaHidden: true });
      const iconEl = screen.getByTestId('testId');
      expect(iconEl).not.toHaveAttribute('id');
    });

    it('renders without title or description"', () => {
      renderSvgIcon({ ariaHidden: true, 'data-testid': 'testId' });
      const iconEl = screen.getByTestId('testId');
      expect(iconEl).toMatchSnapshot();
    });
  });

  // Unless styles are inlined in the test (which is brittle) we can't really test for
  // the presence or absence of computed style values. With Jest we can only test for the
  // absence or presence of a class name.
  describe('has the correct class', () => {
    it('renders with correct class for responsive sizing', () => {
      render(
        <SvgIcon ariaHidden={true} title="test icon" data-testid="classTest">
          <path />
        </SvgIcon>
      );
      const iconEl = screen.getByTestId('classTest');
      expect(iconEl).toHaveClass('ds-c-icon');
    });
  });
});
