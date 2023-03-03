import React from 'react';
import { Typography } from './resetTypography.stories';
import { Lists } from './resetLists.stories';
import { FormElements } from './resetFormEls.stories';

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
