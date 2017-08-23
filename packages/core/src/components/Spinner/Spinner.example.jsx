/* eslint-disable react/display-name */
import Spinner from './Spinner';
import React from 'react';

export default function() {
  return (
    <div>
      <div className="ds-u-display--inline-block ds-u-padding--3">
        <Spinner className="ds-u-valign--middle" />
      </div>
      <div className="ds-u-display--inline-block ds-u-padding--2 ds-u-fill--background-inverse">
        <Spinner background className="ds-u-valign--middle" />
      </div>
      <div className="ds-u-display--inline-block ds-u-padding--2">
        <Spinner background inversed className="ds-u-valign--middle" />
      </div>
    </div>
  );
}
