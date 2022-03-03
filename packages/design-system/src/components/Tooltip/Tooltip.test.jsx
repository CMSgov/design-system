import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';

jest.mock('@popperjs/core');

const defaultProps = {
  children: <TooltipIcon />,
  className: 'ds-c-tooltip__trigger-icon',
  title: 'Tooltip body content',
};

function renderTooltip(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<Tooltip {...props} />);
}

describe('Tooltip', function () {
  it('renders default trigger icon', () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const { asFragment } = renderTooltip({ inversed: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    const { asFragment } = renderTooltip({
      component: 'a',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders dialog tooltip', () => {
    const { asFragment } = renderTooltip({ dialog: true });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('tooltip with close', () => {
    it('renders a close button', () => {
      const { asFragment } = renderTooltip({ dialog: true, showCloseButton: true });
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders heading element', () => {
      const { asFragment } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders heading element and close button', () => {
      const { asFragment } = renderTooltip({
        dialog: true,
        contentHeading: 'Tooltip heading content',
        showCloseButton: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { getByLabelText } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        onClose,
        ariaLabel: 'tooltip trigger',
      });
      const tooltipTrigger = getByLabelText('tooltip trigger');
      console.log(tooltipTrigger);
      fireEvent.click(tooltipTrigger);
      const closeButton = getByLabelText('Close', { selector: 'button' });
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('should close tooltip when onClose is clicked', () => {
      const { getByLabelText, queryByRole } = renderTooltip({
        dialog: true,
        showCloseButton: true,
        ariaLabel: 'tooltip trigger',
      });
      const tooltipTrigger = getByLabelText('tooltip trigger');
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
        ariaLabel: 'tooltip trigger',
      });
      const tooltipTrigger = getByLabelText('tooltip trigger');
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
