/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import IdleTimeoutDialog from './IdleTimeoutDialog';

export default {
  title: 'Components/Idle Timeout',
  component: IdleTimeout,
};

export const Default = () => (
  <IdleTimeout
    timeToTimeout={2}
    onTimeout={() => {
      console.log('onTimeout');
    }}
    timeToWarning={2}
  />
);
export const ViewDialog = () => (
  <IdleTimeoutDialog
    continueSessionText="Continue Session"
    heading="Are you still there?"
    endSessionButtonText="Logout"
    endSessionRedirectUrl="#"
    message='You’ve been inactive for a while. <br/>Your session will end in <strong>2 minutes</strong>. <br/><br/>Select "Continue session" below if you want more time.'
    onSessionContinue={() => {}}
    onSessionForcedEnd={() => {}}
    showSessionEndButton
  />
);
