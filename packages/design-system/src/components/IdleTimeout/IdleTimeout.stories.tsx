/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import IdleTimeoutDialog from './IdleTimeoutDialog';

export default {
  title: 'Components/Idle Timeout',
  component: IdleTimeout,
};

export const Default = (): JSX.Element => (
  <IdleTimeout
    timeToTimeout={2}
    onTimeout={() => {
      console.log('onTimeout');
    }}
    timeToWarning={2}
  />
);
export const ViewDialog = (): JSX.Element => (
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
