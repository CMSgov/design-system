import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import Alert from './Alert';

const meta: Meta = {
  component: Alert,
  argTypes: {
    children: { control: 'text' },
    // @TODO: deprecate, there is only one option: 'lightweight'
    weight: { table: { disable: true } },
  },
  args: {
    hideIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;
const AlertTemplate: Story = {
  render: ({ ...args }) => {
    return <Alert {...args}>{args.children}</Alert>;
  },
};

export const Default = {
  ...AlertTemplate,
  args: {
    heading: 'Confidentiality and medical data sharing',
    children:
      'In accordance with HIPAA, this application does not store any data. All data is stored locally on your computer and is not transmitted to any external servers. The data you enter into this application is not stored or shared with anyone.',
  },
};

export const WithNodeChildren: Story = {
  args: {
    heading: 'Log in to your account to continue',
    children: (
      <>
        <p className="ds-c-alert__text">
          It looks like you may be logged out of your account. Log in to your account to continue.
          If you don&apos;t have an account, you can{' '}
          <a href="https://design.cms.gov/">register one</a> or visit our{' '}
          <a href="https://design.cms.gov/">homepage</a> to learn more.
        </p>
        <div className="[ ds-u-display--flex ds-u-flex-direction--column ] ds-u-margin-top--2 ds-u-sm-display--block">
          <Button variation="solid" className="ds-u-margin-bottom--1 ds-u-sm-margin-bottom--0">
            Log in
          </Button>
          <Button className="ds-u-sm-margin-left--1">Cancel</Button>
        </div>
      </>
    ),
  },
};

export const WithoutChildren = {
  ...AlertTemplate,
  args: {
    heading: 'You have a new message',
    children: null,
  },
};

export const WithoutHeading = {
  ...AlertTemplate,
  args: {
    heading: null,
    children:
      'Your beneficiary information has been updated. You can view your updated information on your dashboard.',
  },
};

export const WithoutIcon = {
  ...AlertTemplate,
  args: {
    heading: 'Understanding your in-network medical benefits',
    children: (
      <>
        <p className="ds-c-alert__text">
          Your plan covers a wide range of medical services. You can see any provider in your
          plan&apos;s network without a referral.
        </p>
        <p className="ds-c-alert__text ds-u-margin-top--1">
          You can also see providers outside of your plan&apos;s network, but you may have to pay
          more. You can find a provider in your plan&apos;s network by{' '}
          <a href="https://design.cms.gov/">using our provider search tool</a>.
        </p>
      </>
    ),
    hideIcon: true,
  },
};

export const Lightweight = {
  ...AlertTemplate,
  args: {
    heading: 'You may be able to save money on your monthly premium',
    children:
      'Based on your income, you may qualify for a plan that costs less than your current plan. You can change plans and apply your savings to your premium each month.',
    weight: 'lightweight',
  },
};

export const Success = {
  ...AlertTemplate,
  args: {
    heading: 'Your application has been submitted',
    children:
      'You successfully submitted your application. You will receive a confirmation email within 24 hours. If you do not receive an email, please contact us at 1-800-555-5555 (TTY: 1-855-555-5555).',
    variation: 'success',
  },
};

export const Warning = {
  ...AlertTemplate,
  args: {
    heading: 'Copy your API key to a safe location',
    children: 'Once you leave this page, you will not be able to access it.',
    variation: 'warn',
  },
};
export const Error = {
  ...AlertTemplate,
  args: {
    heading: 'There was a problem saving your information',
    children:
      'Please review the information you entered and try again. If you continue to have problems, please contact us at 1-800-555-5555 (TTY: 1-855-555-5555).',
    variation: 'error',
  },
};
