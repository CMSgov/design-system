import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';
import Button from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip as any,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: function Component(data, args) {
    return (
      <div style={{ margin: '11rem auto', textAlign: 'center' }}>
        <Tooltip {...(args as any)} />
      </div>
    );
  },
};

export const IconTrigger: Story = {
  render: function Component() {
    return <p className="ds-u-margin--0 ds-u-display--inline">Tooltip with icon trigger</p>;
  },
  args: {
    ariaLabel: 'Label describing the subject of the tooltip',
    className: 'ds-c-tooltip__trigger-icon ds-u-display--inline',
    title: 'Tooltip trigger uses <TooltipIcon> for the trigger content',
    children: <TooltipIcon />,
  },
};

export const InlineTrigger: Story = {
  render: function Component() {
    return <span>Tooltip with&nbsp;</span>;
  },
  args: {
    className: 'ds-c-tooltip__trigger-link',
    component: 'a',
    title: 'Tooltip trigger uses <a> for the trigger, styled with dotted underline',
    children: 'inline trigger',
  },
};

export const InteractiveContent: Story = {
  args: {
    dialog: true,
    className: 'ds-c-button',
    component: 'button',
    title: (
      <>
        <p className="ds-u-margin--0">
          Tooltip dialogs only activate on click and include a focus trap. Intended for tooltips
          with complex layout and <a href="/#">interactive elements</a>
        </p>
        <Button
          size="small"
          className="ds-u-margin-top--2"
          href="https://dequeuniversity.com/library/aria/tooltip-dialog"
        >
          More info
        </Button>
      </>
    ),
    children: 'Tooltip with interactive content',
  },
};

export const TooltipWithCloseButton: Story = {
  args: {
    dialog: true,
    title: (
      <>
        Entering your Social Security Number helps the plan confirm with your state that you have
        Medicaid.
      </>
    ),
    children: 'Tooltip trigger',
    contentHeading: 'Really long Heading for tooltip',
    showCloseButton: true,
    className: 'ds-c-button',
  },
};

export const InversedTrigger: Story = {
  render: function Component() {
    return (
      <p className="ds-u-margin--0 ds-u-color--base-inverse ds-u-display--inline">
        Tooltip with icon trigger
      </p>
    );
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
  args: {
    ariaLabel: 'Label describing the subject of the tooltip',
    className: 'ds-c-tooltip__trigger-icon ds-u-display--inline',
    title: 'Tooltip trigger uses <TooltipIcon> for the trigger content',
    children: <TooltipIcon inversed />,
    inversed: true,
  },
};
