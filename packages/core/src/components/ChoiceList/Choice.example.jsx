import Choice from './Choice';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <Choice defaultChecked name="checkbox_choice" value="a">
      Checkbox A
    </Choice>
    <Choice name="checkbox_choice" value="b">
      Checkbox B
    </Choice>
    <Choice name="checkbox_choice" value="c">
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
  </div>,
  document.getElementById('js-example')
);
