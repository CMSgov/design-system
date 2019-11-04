import React, { Fragment } from 'react';
import FormLabel from './FormLabel';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Fragment>
    <div>
      <FormLabel
        component="label"
        errorMessage="Please enter a valid phone number."
        hint="We'll use this number as a backup if we need to contact you about your application."
        fieldId="number-field-id"
        requirementLabel="Optional"
      >
        Phone number
      </FormLabel>
    </div>
    <fieldset className="ds-c-fieldset">
      <FormLabel
        component="legend"
        hint={
          <span>
            Select all that apply.{' '}
            <a href="void:javascript(0)">Learn more about these documents.</a>
          </span>
        }
        fieldId="document-field-id"
      >
        Select a document type
      </FormLabel>
    </fieldset>
  </Fragment>,
  document.getElementById('js-example')
);
