import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';
import { UtagContainer } from '../analytics';
import { config } from '../config';

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

  it('renders a tooltip on hover', async () => {
    const { user } = renderTooltip();
    const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
    expect(triggerEl).toMatchSnapshot();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(triggerEl);
    await screen.findByRole('tooltip');
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
    jest.useFakeTimers();
    const { user } = renderTooltip({ dialog: true });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = await screen.findByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('closes tooltip when trigger focus is lost', async () => {
    const { user } = renderTooltip();

    const triggerEl = screen.getByLabelText(triggerAriaLabelText);
    await user.tab();
    expect(triggerEl).toHaveFocus();
    await screen.findByRole('tooltip');

    await user.tab();
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'));
  });

  describe('tooltip with close', () => {
    it('renders a close button', async () => {
      const { user } = renderTooltip({ dialog: true, showCloseButton: true });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await user.click(tooltipTrigger);

      await screen.findByLabelText('Close', { selector: 'button' });
    });

    it('renders heading element', async () => {
      jest.useFakeTimers();
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
      jest.useFakeTimers();
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
      jest.useFakeTimers();
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
      user.click(tooltipTrigger);
      const closeButton = await screen.findByLabelText('Close', { selector: 'button' });
      user.click(closeButton);

      await waitFor(() => expect(tooltipTrigger).toHaveFocus());
    });

    it('traps focus', async () => {
      const { user } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        title: <a href="">Test link</a>,
      });

      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      expect(document.body).toHaveFocus();
      await user.click(tooltipTrigger);

      const tooltipContent = await screen.findByRole('dialog');
      const closeButton = await screen.findByLabelText('Close', { selector: 'button' });
      const testLink = await screen.findByText('Test link', { selector: 'a' });

      // Focus transferred to tooltip
      expect(tooltipContent).toHaveFocus();

      // Tab moves the focus to close button
      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab moves the focus to the test link
      await user.tab();
      expect(testLink).toHaveFocus();

      // Floating UI guard prevents focus from leaving the modal.
      await user.tab();
      expect(document.activeElement).toHaveAttribute('data-floating-ui-focus-guard', '');
    });

    it('close button should take custom aria label', async () => {
      const { user } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        closeButtonLabel: 'custom close label text',
      });

      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      expect(document.body).toHaveFocus();
      await user.click(tooltipTrigger);

      await screen.findByLabelText('custom close label text');
    });
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;

    beforeEach(() => {
      config({ tooltipSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ tooltipSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it('sends icon trigger tooltip analytics event on hover', async () => {
      renderTooltip();
      const triggerEl = screen.getByLabelText(triggerAriaLabelText);
      await userEvent.hover(triggerEl);
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('sends inline tooltip analytics event', async () => {
      renderTooltip({ component: 'a', children: 'inline trigger' });
      const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
      await userEvent.hover(triggerEl);
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('sends dialog tooltip analytics event on open', async () => {
      renderTooltip({
        dialog: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      await userEvent.click(tooltipTrigger);
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('disables analytics event tracking', () => {
      renderTooltip({ analytics: false });
      const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
      userEvent.hover(triggerEl);
      expect(tealiumMock).not.toBeCalled();
    });
  });
});
