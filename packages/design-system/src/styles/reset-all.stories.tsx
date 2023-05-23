import React from 'react';
import { Typography } from './reset-typography.stories';
import { Lists } from './reset-lists.stories';
import { FormElements } from './reset-form-els.stories';

export default {
  title: 'Reset/Overview',
};

export const Overview = () => {
  return (
    <>
      <hgroup>
        <h1>Reference Guide</h1>
        <p>This page showcases how reset styles impact HTML tags.</p>
      </hgroup>

      <Typography />
      <Lists />
      <FormElements />
    </>
  );
};
