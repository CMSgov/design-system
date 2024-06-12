import React from 'react';
import { Alert, Button, MultiInputDateField, TextField } from '@cmsgov/design-system';

export default {
  title: 'Patterns/Error validation examples',
};

export const ErrorSummary = () => {
  return (
    <Alert
      autoFocus
      variation="error"
      heading="The form contains the following errors"
      headingId="example-alert"
    >
      <ul aria-labelledby="example-alert" className="ds-u-measure--base">
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
      <Alert
        autoFocus
        variation="error"
        heading="Complete these items to create your account:"
        headingId="single-alert"
      >
        <p className="ds-u-measure--base">
          <a href="#single-last-name">Last Name</a>: Enter a last name that&apos;s more than 1
          character.
        </p>
      </Alert>

      <TextField label="First Name" name="first-name" defaultValue={'Lisa'} />
      <TextField
        id="single-last-name"
        label="Last Name"
        name="last-name"
        errorMessage="Enter a last name that's more than 1 character."
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
      <Alert
        autoFocus
        variation="error"
        heading="Complete these items to create your account:"
        headingId="multi-alert"
      >
        <ul aria-labelledby="multi-alert">
          <li>
            <a href="#multi-last-name" aria-describedby="multi-error-desc-1">
              Last Name
            </a>
            <span aria-hidden id="multi-error-desc-1">
              : Enter a last name that&apos;s more than 1 character.
            </span>
          </li>
          <li>
            <a href="#multi-date__month" aria-describedby="multi-error-desc-2">
              Date of birth
            </a>
            <span aria-hidden id="multi-error-desc-2">
              : Enter birthdate as MM/DD/YYYY.
            </span>
          </li>
        </ul>
      </Alert>
      <TextField label="First Name" name="first-name" defaultValue={'Lisa'} />
      <TextField
        id="multi-last-name"
        label="Last Name"
        name="last-name"
        errorMessage="Enter a last name that's more than 1 character."
      />

      <MultiInputDateField
        id="multi-date"
        label="Date"
        hint=""
        errorMessage="Enter birthdate as MM/DD/YYYY."
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
