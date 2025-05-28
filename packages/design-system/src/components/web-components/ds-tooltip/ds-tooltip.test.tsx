import { UtagContainer } from '../../analytics/index';
import { testAnalytics } from '../__tests__/analytics';
import { config } from '../../config';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-tooltip';
import './ds-tooltip-icon';

jest.mock('@popperjs/core');

const customTooltipText = 'Custom tooltip title text for our web component!';
const customHeadingText = 'Custom tooltip heading text for our web component!';
const childText = 'Bog standard child content.';
const triggerAriaLabelText = 'tooltip trigger aria label';

const defaultProps = {
  children: <ds-tooltip-icon />,
  'class-name': 'ds-c-tooltip__trigger-icon',
  title: customTooltipText,
  'root-id': '1234',
  'trigger-aria-label': triggerAriaLabelText,
};

const propsWithSlots = {
  children: (
    <>
      <div slot="title">{customTooltipText}</div>
      <div slot="content-heading">{customHeadingText}</div>
      {childText}
    </>
  ),
};

function renderTooltip(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<ds-tooltip {...props} />);
}

describe('ds-tooltip', function () {
  it('renders a tooltip', () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders title and contentHeading when passed in as slots', () => {
    jest.useFakeTimers();
    const { container } = renderTooltip(propsWithSlots);
    const tooltip = container.querySelector('.ds-c-tooltip');

    userEvent.tab();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(tooltip).toHaveTextContent(customTooltipText);
    expect(tooltip).toHaveTextContent(customHeadingText);
  });

  it('renders default trigger icon', () => {
    renderTooltip();
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    expect(tooltipTrigger).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    renderTooltip({
      component: 'a',
      children: childText,
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    expect(tooltipTrigger).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const { asFragment } = renderTooltip({ inversed: 'true' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders dialog tooltip', () => {
    renderTooltip({ dialog: 'true', children: childText });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    userEvent.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  it('closes tooltip when trigger focus is lost', async () => {
    jest.useFakeTimers();
    const { container } = renderTooltip();
    const tooltip = container.querySelector('.ds-c-tooltip');

    userEvent.tab();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(tooltip).toHaveClass('ds-c-tooltip-enter');

    userEvent.tab();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(tooltip).toHaveClass('ds-c-tooltip-exit');
  });

  it('renders a close button', () => {
    renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const closeButton = screen.getByLabelText('Close', { selector: 'button' });
    expect(closeButton).toBeDefined();
  });

  it('renders heading element', () => {
    renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    userEvent.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('renders heading element and close button', () => {
    renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    userEvent.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('should close tooltip when onClose is clicked', () => {
    renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    userEvent.click(tooltipTrigger);
    const closeButton = screen.getByLabelText('Close', { selector: 'button' });
    userEvent.click(closeButton);
    const tooltipContent = screen.queryByRole('dialog');
    expect(tooltipContent).toBeNull();
  });

  it('should return focus back to trigger when closed', () => {
    renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    userEvent.click(tooltipTrigger);
    const closeButton = screen.getByLabelText('Close', { selector: 'button' });
    userEvent.click(closeButton);
    expect(tooltipTrigger).toEqual(document.activeElement); // eslint-disable-line
  });

  it('close button should take custom aria label', () => {
    renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
      'close-button-label': 'custom close label text',
    });
    const closeButton = screen.queryByLabelText('custom close label text');
    expect(closeButton).not.toBeNull();
  });
});

describe('Analytics event tracking', () => {
  beforeEach(() => {
    config({ tooltipSendsAnalytics: true });
  });

  afterEach(() => {
    config({ tooltipSendsAnalytics: false });
  });

  testAnalytics(
    'sends inline trigger tooltip analytics event',
    async ({ tealiumMock, waitForAnalytics }) => {
      renderTooltip();
      const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
      userEvent.hover(triggerEl);
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    }
  );

  testAnalytics(
    'sends icon and inversed trigger tooltip analytics event',
    async ({ tealiumMock, waitForAnalytics }) => {
      renderTooltip();
      userEvent.hover(screen.getByRole('button'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    }
  );

  testAnalytics('disables analytics event tracking', async ({ tealiumMock, waitForAnalytics }) => {
    renderTooltip({ analytics: false });
    const triggerEl = screen.queryByLabelText(triggerAriaLabelText);
    userEvent.hover(triggerEl);
    await waitForAnalytics();
    expect(tealiumMock).not.toBeCalled();
  });

  testAnalytics(
    'sends interactive content and tooltip with close button analytics event',
    async ({ tealiumMock, waitForAnalytics }) => {
      renderTooltip();
      userEvent.click(screen.getByRole('button'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    }
  );
});
