import React from 'react';

import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';
import Button from '../Button/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    children: { control: false },
    data: { table: { disable: true } },
    placement: {
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
      control: { type: 'select' },
    },
  },
};

const Template = ({ data, ...args }) => (
  <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin--7 ds-u-padding--7">
    {data}
    <Tooltip {...args} />
  </div>
);

export const IconTrigger = Template.bind({});
IconTrigger.args = {
  data: <p className="ds-u-margin--0">Tooltip with icon trigger</p>,
  ariaLabel: 'Label describing the subject of the tooltip',
  className: 'ds-c-tooltip__trigger-icon',
  title: 'Tooltip trigger uses <TooltipIcon> for the trigger content',
  children: <TooltipIcon />,
};

export const InlineTrigger = Template.bind({});
InlineTrigger.args = {
  data: <span>Tooltip with&nbsp;</span>,
  className: 'ds-c-tooltip__trigger-link',
  component: 'a',
  title: 'Tooltip trigger uses <a> for the trigger, styled with dotted underline',
  children: 'inline trigger',
};

export const InteractiveContent = Template.bind({});
InteractiveContent.args = {
  dialog: true,
  className: 'ds-c-button',
  component: 'button',
  title: (
    <>
      <p className="ds-u-margin--0">
        Tooltip dialogs only activate on click and include a focus trap. Intended for tooltips with
        complex layout and <a href="/#">interactive elements</a>
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
};

export const TooltipWithCloseButton = Template.bind({});
TooltipWithCloseButton.args = {
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
};
