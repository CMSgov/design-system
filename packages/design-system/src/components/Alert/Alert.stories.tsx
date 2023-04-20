import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  parameters: {
    docs: {
      controls: { sort: ['alpha'] },
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    hideIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const AlertTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Alert {...args}>
          {args.children ?? (
            <p className="ds-c-alert__text">
              Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
              adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and
              used with just a heading prop.
            </p>
          )}
        </Alert>

        <Alert {...args} className="ds-u-margin-top--3" />

        <Alert {...args} className="ds-u-margin-top--3" heading={undefined}>
          {args.children ?? (
            <p className="ds-c-alert__text">An alert without a heading. Lorem ipsum dolor sit.</p>
          )}
        </Alert>
      </>
    );
  },
};

export const Default = {
  ...AlertTemplate,
  args: {
    heading: 'This is a simple heading',
  },
};

export const ErrorAlert = {
  ...AlertTemplate,
  args: {
    heading: 'There was an Error',
    variation: 'error',
  },
};

export const WarningAlert = {
  ...AlertTemplate,
  args: {
    heading: 'Warning variation theme',
    variation: 'warn',
  },
};

export const SuccessAlert = {
  ...AlertTemplate,
  args: {
    heading: 'Success variation theme',
    variation: 'success',
  },
};

export const NoIconAlert = {
  ...AlertTemplate,
  args: {
    heading: 'Alert without icon',
    hideIcon: true,
  },
};

export const LightweightAlert = {
  ...AlertTemplate,
  args: {
    heading: 'A lightweight heading',
    weight: 'lightweight',
  },
};

export const AlertWithButtons: Story = {
  args: {
    heading: 'Alert with buttons',
    children: (
      <>
        <p className="ds-c-alert__text">
          Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
          adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and used
          with just a heading prop.
        </p>
        <div className="ds-u-margin-top--2">
          <Button variation="solid">Primary action</Button>
          <Button className="ds-u-margin-left--1">Secondary action</Button>
        </div>
      </>
    ),
  },
};
