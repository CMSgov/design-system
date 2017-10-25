/* eslint-disable react/display-name */
import Choice from './Choice';
import React from 'react';
import TextField from '../TextField/TextField';

export default function() {
  return (
    <div>
      <Choice name="preference" value="phone">
        Phone
      </Choice>
      <Choice
        name="preference"
        value="value"
        checkedChildren={
          <TextField label="What is your email address?" name="email" />
        }
      >
        Email
      </Choice>
    </div>
  );
}
