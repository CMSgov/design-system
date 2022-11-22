import React from 'react';
import IdleTimeout from './IdleTimeout';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

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
    timeToWarning: 0.5,
    onTimeout: action('onTimeout'),
  },
};

const Template = ({ ...args }) => {
  const [{ timeToTimeout, timeToWarning }] = useArgs();
  return (
    <>
      <p>Idle Timeout modal will show after {timeToWarning} minutes of inactivity.</p>
      <IdleTimeout timeToTimeout={timeToTimeout} timeToWarning={timeToWarning} {...args} />
    </>
  );
};

export const Default = Template.bind({});

export const ViewDialog = () => (
  <IdleTimeoutDialog
    continueSessionText="Continue Session"
    heading="Are you still there?"
    endSessionButtonText="Logout"
    endSessionUrl="#"
    message='You’ve been inactive for a while. Your session will end in 2 minutes. Select "Continue session" below if you want more time.'
    onClose={action('onClose')}
    onSessionContinue={action('onSessionContinue')}
    onSessionForcedEnd={action('onSessionForcedEnd')}
    showSessionEndButton
  />
);
