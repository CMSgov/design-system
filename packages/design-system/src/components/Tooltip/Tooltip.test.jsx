import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';

jest.mock('@popperjs/core');
// This module has issues with newer versions of @testing-library/react
jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

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
    const { queryByLabelText } = renderTooltip();
    const triggerEl = queryByLabelText(triggerAriaLabelText);
    expect(triggerEl).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const { asFragment } = renderTooltip({ inversed: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    const { queryByLabelText } = renderTooltip({
      component: 'a',
    });
    const triggerEl = queryByLabelText(triggerAriaLabelText);
    expect(triggerEl).toMatchSnapshot();
  });

  it('renders dialog tooltip', () => {
    const { queryByRole, getByLabelText } = renderTooltip({ dialog: true });
    const tooltipTrigger = getByLabelText(triggerAriaLabelText);
    fireEvent.click(tooltipTrigger);
    const contentEl = queryByRole('dialog');
    expect(contentEl).not.toBeNull();
    expect(contentEl).toMatchSnapshot();
  });

  describe('tooltip with close', () => {
    it('renders a close button', () => {
      const { getByLabelText } = renderTooltip({ dialog: true, showCloseButton: true });
      const closeButton = getByLabelText('Close', { selector: 'button' });
      expect(closeButton).toBeDefined();
    });

    it('renders heading element', () => {
      const { queryByRole, getByLabelText } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
      });
      const tooltipTrigger = getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const contentEl = queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('renders heading element and close button', () => {
      const { queryByRole, getByLabelText } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
        showCloseButton: true,
      });
      const tooltipTrigger = getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const contentEl = queryByRole('dialog');
      expect(contentEl).toMatchSnapshot();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { getByLabelText } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        onClose,
      });
      const tooltipTrigger = getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('should close tooltip when onClose is clicked', () => {
      const { getByLabelText, queryByRole } = renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      const tooltipContent = queryByRole('dialog');
      expect(tooltipContent).toBeNull();
    });

    it('should return focus back to trigger when closed', () => {
      const { getByLabelText } = renderTooltip({
        dialog: true,
        showCloseButton: true,
      });
      const tooltipTrigger = getByLabelText(triggerAriaLabelText);
      fireEvent.click(tooltipTrigger);
      const closeButton = getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      expect(tooltipTrigger).toEqual(document.activeElement);
    });

    it('close button should take custom aria label', () => {
      const { queryByLabelText } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        closeButtonLabel: 'custom close label text',
      });
      const closeButton = queryByLabelText('custom close label text');
      expect(closeButton).not.toBeNull();
    });
  });
});
