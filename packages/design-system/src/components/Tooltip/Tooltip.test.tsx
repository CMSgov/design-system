import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';

jest.mock('@popperjs/core');

const triggerAriaLabelText = 'tooltip trigger';
const defaultProps = {
  children: <TooltipIcon />,
  className: 'ds-c-tooltip__trigger-icon',
  title: 'Tooltip body content',
  ariaLabel: triggerAriaLabelText,
  id: 'static-id',
};

function renderTooltip(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return {
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    ...render(<Tooltip {...props} />),
  };
}

describe('Tooltip', function () {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders default trigger icon', () => {
    renderTooltip();
    const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
    expect(triggerEl).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const { asFragment } = renderTooltip({ inversed: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    renderTooltip({
      component: 'a',
    });
    const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
    expect(triggerEl).toMatchSnapshot();
  });

  it('renders dialog tooltip', async () => {
    const { user } = renderTooltip({ dialog: true });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  it('closes tooltip when trigger focus is lost', async () => {
    jest.useFakeTimers();
    const { container, user } = renderTooltip();
    const tooltip = container.querySelector('.ds-c-tooltip');

    await user.tab();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(tooltip).toHaveClass('ds-c-tooltip-enter');

    await user.tab();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(tooltip).toHaveClass('ds-c-tooltip-exit');
  });

  describe('tooltip with close', () => {
    it('renders a close button', () => {
      renderTooltip({ dialog: true, showCloseButton: true });
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      expect(closeButton).toBeDefined();
    });

    it('renders heading element', async () => {
      const { user } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);
      const contentEl = screen.queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('renders heading element and close button', async () => {
      const { user } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);
      const contentEl = screen.queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('should call onClose when close button is clicked', async () => {
      const onClose = jest.fn();
      const { user } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        onClose,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      await user.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('should close tooltip when onClose is clicked', async () => {
      const { user } = renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      await user.click(closeButton);
      const tooltipContent = screen.queryByRole('dialog');
      expect(tooltipContent).toBeNull();
    });

    it('should return focus back to trigger when closed', async () => {
      const { user } = renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      await act(async () => {
        await user.click(closeButton);
      });
      expect(tooltipTrigger).toEqual(document.activeElement); // eslint-disable-line
    });

    it('close button should take custom aria label', () => {
      renderTooltip({
        dialog: true,
        showCloseButton: true,
        closeButtonLabel: 'custom close label text',
      });
      const closeButton = screen.queryByLabelText('custom close label text');
      expect(closeButton).not.toBeNull();
    });
  });
});
