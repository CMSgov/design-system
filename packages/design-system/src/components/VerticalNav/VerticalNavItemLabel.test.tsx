import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerticalNavItemLabel, { VerticalNavItemLabelProps } from './VerticalNavItemLabel';

function renderVerticalNavItemLabel(customProps = {}) {
  const props: VerticalNavItemLabelProps = {
    label: 'Foo',
    subnavId: 'foo-subnav',
    ...customProps,
  };

  return render(<VerticalNavItemLabel {...props} />);
}

describe('VerticalNavItemLabel', () => {
  it('accepts a node as a label', () => {
    const { asFragment } = renderVerticalNavItemLabel({
      label: <strong>Foo</strong>,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('is not selected', () => {
    renderVerticalNavItemLabel();

    const labelEl = screen.getByText('Foo');
    expect(labelEl.classList).not.toContain('ds-c-vertical-nav__label--current');
  });

  it('is selected', () => {
    renderVerticalNavItemLabel({ selected: true });

    const labelEl = screen.getByText('Foo');
    expect(labelEl.classList).toContain('ds-c-vertical-nav__label--current');
  });

  it('calls onClick', () => {
    const mockOnClick = jest.fn();
    renderVerticalNavItemLabel({ onClick: mockOnClick });
    const labelEl = screen.getByText('Foo');

    userEvent.click(labelEl);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('uses provided component', () => {
    const mockComponent = ({ ...props }) => {
      return <span {...props} />;
    };

    const { asFragment } = renderVerticalNavItemLabel({ component: mockComponent });
    const labelEl = screen.getByText('Foo');

    expect(labelEl.nodeName).toEqual('SPAN');
    expect(asFragment()).toMatchSnapshot();
  });

  describe('without subnav', () => {
    it('is a div element by default', () => {
      renderVerticalNavItemLabel();
      const labelEl = screen.getByText('Foo');

      expect(labelEl.nodeName).toBe('DIV');
      expect(labelEl.getAttribute('href')).toBeNull();
    });

    it('is an anchor element', () => {
      renderVerticalNavItemLabel({ url: '/bar' });
      const labelEl = screen.getByText('Foo') as HTMLAnchorElement;

      expect(labelEl.nodeName).toBe('A');
      expect(labelEl.getAttribute('href')).toBe('/bar');
    });

    it('ignores ARIA subnav attributes', () => {
      renderVerticalNavItemLabel();
      const labelEl = screen.getByText('Foo');

      expect(labelEl.getAttribute('title')).toBeNull();
      expect(labelEl.getAttribute('aria-controls')).toBeNull();
      expect(labelEl.getAttribute('aria-expanded')).toBeNull();
    });
  });

  describe('with subnav', () => {
    let props;

    beforeEach(() => {
      props = { hasSubnav: true };
    });

    it('is a button when URL not present', () => {
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl).toBeDefined();
      expect(labelEl.nodeName).toBe('BUTTON');
    });

    it('is a button even when URL is present', () => {
      props.url = '/foo';
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl).toBeDefined();
      expect(labelEl.nodeName).toBe('BUTTON');
      expect(labelEl.getAttribute('href')).toBeNull();
    });

    it('has ARIA attributes', () => {
      props.collapsed = true;
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl.getAttribute('aria-controls')).toBe('foo-subnav');
      expect(labelEl.getAttribute('aria-expanded')).toBe('false');
    });

    it('has default collapsed state title', () => {
      props.collapsed = true;
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl.getAttribute('title')).toBe('Expand sub-navigation');
    });

    it('has default expanded state title', () => {
      props.collapsed = false;
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl.getAttribute('title')).toBe('Collapse sub-navigation');
    });

    it('uses provided collapsed state title', () => {
      props.collapsed = true;
      props.ariaCollapsedStateButtonLabel = 'Expand me';
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl.getAttribute('title')).toBe(props.ariaCollapsedStateButtonLabel);
    });

    it('uses provided expanded state title', () => {
      props.collapsed = false;
      props.ariaExpandedStateButtonLabel = 'Collapse me';
      renderVerticalNavItemLabel(props);
      const labelEl = screen.getByRole('button');

      expect(labelEl.getAttribute('title')).toBe(props.ariaExpandedStateButtonLabel);
    });

    it('shows a down arrow when collapsed', () => {
      props.collapsed = true;
      const { asFragment } = renderVerticalNavItemLabel(props);

      expect(asFragment()).toMatchSnapshot();
    });

    it('shows an up arrow when not collapsed', () => {
      props.collapsed = false;
      const { asFragment } = renderVerticalNavItemLabel(props);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
