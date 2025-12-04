import { waitFor, within } from '@testing-library/react';
import './ds-tooltip';
import './ds-tooltip-icon';
import { createTestRenderer } from '../__tests__/rendering';

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

const renderTooltip = createTestRenderer('ds-tooltip', (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  return <ds-tooltip {...props} />;
});

describe('ds-tooltip', function () {
  it('renders a tooltip', () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders title and contentHeading when passed in as slots', async () => {
    const { shadowElement, shadowRoot, user } = renderTooltip(propsWithSlots);

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);

    const titleSlot = shadowRoot.querySelector("slot[name='title'") as HTMLSlotElement;
    const [title] = titleSlot.assignedNodes();
    expect(title).toHaveTextContent(customTooltipText);

    const headingSlot = shadowRoot.querySelector("slot[name='content-heading'") as HTMLSlotElement;
    const [heading] = headingSlot.assignedNodes();
    expect(heading).toHaveTextContent(customHeadingText);
  });

  it('renders default trigger icon', () => {
    const { shadowElement } = renderTooltip();

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    expect(tooltipTrigger).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    const { shadowElement } = renderTooltip({
      component: 'a',
      children: childText,
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    expect(tooltipTrigger).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const { asFragment } = renderTooltip({ inversed: 'true' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders dialog tooltip', async () => {
    const { shadowElement, user } = renderTooltip({ dialog: 'true', children: childText });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = shadowContainer.queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  it('closes tooltip when trigger focus is lost', async () => {
    const { shadowElement, shadowRoot, user } = renderTooltip();

    const shadowContainer = within(shadowElement);
    const triggerEl = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(triggerEl);
    expect(shadowRoot.activeElement).toBe(triggerEl);
    await shadowContainer.findByRole('tooltip');

    await user.tab();
    await waitFor(() => expect(shadowContainer.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('renders a close button', async () => {
    const { shadowElement, user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);

    await shadowContainer.findByLabelText('Close', { selector: 'button' });
  });

  it('renders heading element', async () => {
    const { shadowElement, user } = renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = shadowContainer.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('renders heading element and close button', async () => {
    const { shadowElement, user } = renderTooltip({
      dialog: 'true',
      'content-heading': customHeadingText,
      'show-close-button': 'true',
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const contentEl = shadowContainer.queryByRole('dialog');
    expect(contentEl).toMatchSnapshot();
  });

  it('should close tooltip when onClose is clicked', async () => {
    const { shadowElement, user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);
    const closeButton = shadowContainer.getByLabelText('Close', { selector: 'button' });
    await user.click(closeButton);
    const tooltipContent = shadowContainer.queryByRole('dialog');
    expect(tooltipContent).toBeNull();
  });

  it('should return focus back to trigger when closed', async () => {
    const { shadowElement, shadowRoot, user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    user.click(tooltipTrigger);
    const closeButton = await shadowContainer.findByLabelText('Close', { selector: 'button' });
    user.click(closeButton);
    await waitFor(() => expect(shadowRoot.activeElement).toBe(tooltipTrigger));
  });

  it('close button should take custom aria label', async () => {
    const { shadowElement, user } = renderTooltip({
      dialog: 'true',
      'show-close-button': 'true',
      'close-button-label': 'custom close label text',
    });

    const shadowContainer = within(shadowElement);
    const tooltipTrigger = shadowContainer.getByLabelText(triggerAriaLabelText);
    await user.click(tooltipTrigger);

    await shadowContainer.findByLabelText('custom close label text');
  });
});
