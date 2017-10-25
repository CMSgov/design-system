/* eslint-disable react/display-name */
import Choice from './Choice';
import React from 'react';

export default function() {
  return (
    <div>
      <Choice defaultChecked name="checkbox_choice" value="a">
        Checkbox A
      </Choice>
      <Choice name="checkbox_choice" value="b">
        Checkbox B
      </Choice>
      <Choice
        name="checkbox_choice"
        uncheckedChildren={
          <span className="ds-c-field__hint">
            Hint text only visible when Checkbox C is not checked
          </span>
        }
        value="c"
      >
        Checkbox C
      </Choice>

      <div className="ds-u-margin-top--4">
        <Choice defaultChecked name="radio_choice" type="radio" value="a">
          Radio A
        </Choice>
        <Choice name="radio_choice" type="radio" value="b">
          Radio B
        </Choice>
      </div>
    </div>
  );
}
