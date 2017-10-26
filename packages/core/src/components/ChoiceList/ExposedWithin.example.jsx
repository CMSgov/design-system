/* eslint-disable react/display-name */
import { Choice, TextField } from '../index';
import React from 'react';

export default function() {
  return (
    <div>
      <Choice
        name="preference"
        type="radio"
        value="phone"
        checkedChildren={
          <TextField
            labelClassName="ds-u-margin-top--0"
            label="What is your phone number?"
            name="phone"
          />
        }
      >
        Phone
      </Choice>
      <Choice
        name="preference"
        type="radio"
        value="value"
        checkedChildren={
          <TextField
            labelClassName="ds-u-margin-top--0"
            label="What is your email address?"
            name="email"
          />
        }
      >
        Email
      </Choice>
    </div>
  );
}
