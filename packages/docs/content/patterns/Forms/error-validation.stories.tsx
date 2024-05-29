import React from 'react';
import { Alert, Button, MultiInputDateField, TextField } from '@cmsgov/design-system';

export default {
  title: 'Patterns/Error validation examples',
};

export const ErrorSummary = () => {
  return (
    <Alert variation="error" heading="The form contains the following errors">
      <ul className="ds-u-measure--base">
        <li>
          <a href="#!">Error Link</a>: Error Description
        </li>
        <li>
          <a href="#!">Error Link</a>: Error Description
        </li>
      </ul>
    </Alert>
  );
};

export const SingleError = () => {
  return (
    <form>
      <Alert variation="error" heading="Complete these items to create your account:">
        <p className="ds-u-measure--base">
          <a href="#single-last-name">Last Name</a>: Check your last name.
        </p>
      </Alert>

      <TextField label="First Name" name="first-name" defaultValue={'Lisa'} />
      <TextField
        id="single-last-name"
        label="Last Name"
        name="last-name"
        errorMessage="Check your last name."
      />
      <Button type="submit" className="ds-u-margin-top--5" variation="solid">
        Submit
      </Button>
    </form>
  );
};

export const MultipleErrors = () => {
  return (
    <form>
      <Alert variation="error" heading="Complete these items to create your account:">
        <ul>
          <li>
            <a href="#mult-last-name">Last Name</a>: Check your last name.
          </li>
          <li>
            <a href="#multi-date__month">Date of birth</a>: Enter your date of birth.
          </li>
        </ul>
      </Alert>
      <TextField label="First Name" name="first-name" defaultValue={'Lisa'} />
      <TextField
        id="mult-last-name"
        label="Last Name"
        name="last-name"
        errorMessage="Check your last name."
      />

      <MultiInputDateField
        id="multi-date"
        label="Date"
        hint=""
        errorMessage="Enter your date of birth."
        monthInvalid
        dayDefaultValue="1"
        yearDefaultValue="1990"
      />
      <Button type="submit" className="ds-u-margin-top--5" variation="solid">
        Submit
      </Button>
    </form>
  );
};
