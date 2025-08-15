import Tab from './Tab';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  id: 'tab',
  panelId: 'panel',
};

function renderTab(customProps = {}) {
  const props = {
    ...defaultProps,
    ...customProps,
  };

  return {
    user: userEvent.setup(),
    ...render(<Tab {...props}>Label</Tab>),
  };
}

describe('Tab', function () {
  it('renders a tab', () => {
    renderTab();
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;

    expect(tabEl).toBeDefined();
    expect(tabEl.getAttribute('href')).toBe(`#${defaultProps.panelId}`);
    expect(tabEl.text).toBe('Label');
    expect(tabEl.classList).toContain('ds-c-tabs__item');
    // ARIA
    expect(tabEl.getAttribute('aria-controls')).toBe(defaultProps.panelId);
    expect(tabEl.getAttribute('aria-selected')).toBe('false');
  });

  it('calls onClick', async () => {
    const onClickMock = jest.fn();
    const { user } = renderTab({ onClick: onClickMock });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;

    await user.click(tabEl);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(
      expect.anything(),
      defaultProps.panelId,
      defaultProps.id,
      `#${defaultProps.panelId}`
    );
  });

  it('calls onKeyDown', async () => {
    const onKeyDownMock = jest.fn();
    const { user } = renderTab({ onKeyDown: onKeyDownMock });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;
    tabEl.focus();
    await user.keyboard('{Tab}');

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    expect(onKeyDownMock).toHaveBeenCalledWith(
      expect.anything(),
      defaultProps.panelId,
      defaultProps.id,
      `#${defaultProps.panelId}`
    );
  });

  it("doesn't call onClick when disabled", async () => {
    const onClickMock = jest.fn();
    const { user } = renderTab({ onClick: onClickMock, disabled: true });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;

    await user.click(tabEl);
    await user.keyboard('{Enter}');

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('is selected', () => {
    renderTab({ selected: true });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;
    expect(tabEl.getAttribute('aria-selected')).toBe('true');
  });

  it('has custom href attribute', () => {
    renderTab({ href: '/example' });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;
    expect(tabEl.getAttribute('href')).toBe('/example');
  });

  it('adds additional class names', () => {
    const className = 'foo-boo';
    renderTab({ className: className });
    const tabEl: HTMLAnchorElement = screen.getByRole('tab') as HTMLAnchorElement;
    expect(tabEl.classList).toContain('ds-c-tabs__item');
    expect(tabEl.classList).toContain(className);
  });
});
