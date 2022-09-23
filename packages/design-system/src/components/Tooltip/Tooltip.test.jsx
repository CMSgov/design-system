import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';

jest.mock('@popperjs/core');

const triggerAriaLabelText = 'tooltip trigger';
const defaultProps = {
  children: <TooltipIcon />,
  className: 'ds-c-tooltip__trigger-icon',
  title: 'Tooltip body content',
  ariaLabel: triggerAriaLabelText,
};

function renderTooltip(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<Tooltip {...props} />);
}

describe('Tooltip', function () {
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

  it('renders dialog tooltip', () => {
    renderTooltip({ dialog: true });
    const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
    fireEvent.click(tooltipTrigger);
    const contentEl = screen.queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  describe('tooltip with close', () => {
    it('renders a close button', () => {
      renderTooltip({ dialog: true, showCloseButton: true });
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      expect(closeButton).toBeDefined();
    });

    it('renders heading element', () => {
      renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const contentEl = screen.queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('renders heading element and close button', () => {
      renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const contentEl = screen.queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      renderTooltip({
        dialog: true,
        showCloseButton: true,
        onClose,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('should close tooltip when onClose is clicked', () => {
      renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      const tooltipContent = screen.queryByRole('dialog');
      expect(tooltipContent).toBeNull();
    });

    it('should return focus back to trigger when closed', () => {
      renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = screen.getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = screen.getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
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
