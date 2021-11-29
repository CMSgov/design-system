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
      options: ['auto', 'left', 'right', 'top', 'bottom'],
      control: { type: 'select' },
    },
  },
};

const Template = ({ data, ...args }) => (
  <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-x--4 ds-u-margin-y--3">
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
