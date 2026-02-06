import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-tooltip';
import './ds-tooltip-icon';

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
  return {
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    ...render(<ds-tooltip {...props} />),
  };
}

describe('ds-tooltip', function () {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders a tooltip', () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders title and contentHeading when passed in as slots', async () => {
    const { user } = renderTooltip(propsWithSlots);

    await user.tab();
    const tooltip = await screen.findByRole('tooltip');
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

  it('renders dialog tooltip', async () => {
    jest.useFakeTimers();
    const { user } = renderTooltip({ dialog: 'true', children: childText });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  it('closes tooltip when trigger focus is lost', async () => {
    const { user } = renderTooltip();

    const triggerEl = screen.getByLabelText(triggerAriaLabelText);
    await user.tab();
    expect(triggerEl).toHaveFocus();
    await screen.findByRole('tooltip');

    await user.tab();
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('renders a close button', async () => {
    const { user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);

    await screen.findByLabelText('Close', { selector: 'button' });
  });

  it('renders heading element', async () => {
    jest.useFakeTimers();
    const { user } = renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('renders heading element and close button', async () => {
    jest.useFakeTimers();
    const { user } = renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('should close tooltip when onClose is clicked', async () => {
    jest.useFakeTimers();
    const { user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const closeButton = screen.getByLabelText('Close', { selector: 'button' });
    await user.click(closeButton);
    const tooltipContent = screen.queryByRole('dialog');
    expect(tooltipContent).toBeNull();
  });

  it('should return focus back to trigger when closed', async () => {
    jest.useFakeTimers();
    const { user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    user.click(tooltipTrigger);
    const closeButton = await screen.findByLabelText('Close', { selector: 'button' });
    user.click(closeButton);
    await waitFor(() => expect(tooltipTrigger).toHaveFocus());
  });

  it('close button should take custom aria label', async () => {
    const { user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
      'close-button-label': 'custom close label text',
    });

    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);

    await screen.findByLabelText('custom close label text');
  });
});
