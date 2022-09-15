import React from 'react';
import { Button } from '../Button';

import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {},
  args: {
    hideIcon: false,
  },
};

const Template = (args) => (
  <>
    <Alert {...args}>
      <p className="ds-c-alert__text">
        Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
        adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and used
        with just a heading prop.
      </p>
    </Alert>

    <Alert {...args} className="ds-u-margin-top--3" />

    <Alert {...args} className="ds-u-margin-top--3" heading="">
      <p className="ds-c-alert__text">An alert without a heading. Lorem ipsum dolor sit.</p>
    </Alert>
  </>
);

export const Default = Template.bind({});
Default.args = {
  heading: 'This is a simple heading',
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  heading: 'There was an Error',
  variation: 'error',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  heading: 'Warning variation theme',
  variation: 'warn',
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  heading: 'Success variation theme',
  variation: 'success',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  heading: 'No icon represented',
  hideIcon: true,
};

export const LightWeight = Template.bind({});
LightWeight.args = {
  heading: 'A lightweight heading',
  weight: 'lightweight',
};

export const AlertWithButtons = (args) => {
  return (
    <div className="ds-u-measure--base">
      <Alert {...args}>
        <p className="ds-c-alert__text">
          Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
          adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and used
          with just a heading prop.
        </p>
        <div className="ds-u-margin-top--2">
          <Button variation="solid">Primary action</Button>
          <Button className="ds-u-margin-left--1">Secondary action</Button>
        </div>
      </Alert>

      <Alert {...args} className="ds-u-margin-top--3">
        <p className="ds-c-alert__text">
          Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
          adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and used
          with just a heading prop.
        </p>
        <div className="ds-u-margin-top--2">
          <Button variation="solid" href="#">
            Primary action (link)
          </Button>
          <Button className="ds-u-margin-left--1" href="#">
            Secondary action (link)
          </Button>
        </div>
      </Alert>
    </div>
  );
};
