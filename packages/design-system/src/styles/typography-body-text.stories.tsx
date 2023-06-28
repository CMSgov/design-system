import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography/Body Text',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const body =
  'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.';

export const AllBodyText: Story = {
  render: function Component() {
    return (
      <>
        <p className="ds-text-body--lg">
          <strong>Large:</strong> {body}
        </p>
        <p className="ds-text-body--md">
          <strong>Medium:</strong> {body}
        </p>
        <p className="ds-text-body--sm">
          <strong>Small:</strong> {body}
        </p>
      </>
    );
  },
};

export const AllBodyTextOnDark: Story = {
  ...AllBodyText,
  parameters: {
    baseInverse: true,
  },
};

export const BodyTextLarge: Story = {
  render: function Component() {
    return (
      <p className="ds-text-body--lg">
        <strong>Large:</strong> {body}
      </p>
    );
  },
};

export const BodyTextMedium: Story = {
  render: function Component() {
    return (
      <p className="ds-text-body--md">
        <strong>Medium:</strong> {body}
      </p>
    );
  },
};

export const BodyTextSmall: Story = {
  render: function Component() {
    return (
      <p className="ds-text-body--sm">
        <strong>Small:</strong> {body}
      </p>
    );
  },
};
