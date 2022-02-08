/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <ArgsTable story={PRIMARY_STORY} />
  </>
);

export default {
  title: 'Components/Idle Timeout',
  component: IdleTimeout,
  parameters: {
    docs: {
      inlineStories: false,
      page: DocsPage,
    },
  },
  argTypes: {},
  args: {
    timeToTimeout: 2,
    timeToWarning: 2,
    onTimeout: () => {
      console.log('onTimeout');
    },
  },
};

const Template = ({ ...args }) => <IdleTimeout {...args} />;

export const Default = Template.bind({});

export const ViewDialog = () => (
  <IdleTimeoutDialog
    continueSessionText="Continue Session"
    heading="Are you still there?"
    endSessionButtonText="Logout"
    endSessionRedirectUrl="#"
    message='You’ve been inactive for a while. Your session will end in 2 minutes. Select "Continue session" below if you want more time.'
    onSessionContinue={() => {}}
    onSessionForcedEnd={() => {}}
    showSessionEndButton
  />
);
