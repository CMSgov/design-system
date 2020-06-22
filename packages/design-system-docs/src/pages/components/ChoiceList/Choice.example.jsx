import { Choice, Dropdown } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const dropdownOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
];

const childDropdown = (
  <Dropdown
    options={dropdownOptions}
    defaultValue="B"
    label="Dropdown example"
    labelClassName="ds-c-label ds-u-margin-top--0"
    name="dropdown_choices_field"
  />
);

class ControlledChoiceButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'y',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  render() {
    return (
      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">Controlled Radio buttons with children</legend>
        <Choice
          checked={this.state.selectedOption === 'x'}
          onChange={this.handleChange}
          name="radio_controlled_children"
          type="radio"
          value="x"
        >
          Radio A
        </Choice>
        <Choice
          checked={this.state.selectedOption === 'y'}
          onChange={this.handleChange}
          name="radio_controlled_children"
          type="radio"
          value="y"
          checkedChildren={<div className="ds-c-choice__checkedChild">{childDropdown}</div>}
        >
          Radio B - with children
        </Choice>
      </fieldset>
    );
  }
}

ReactDOM.render(
  <div>
    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Checkboxes</legend>
      <Choice
        defaultChecked
        hint="Checkbox A hint"
        name="checkbox_choice"
        type="checkbox"
        value="a"
      >
        Checkbox A
      </Choice>
      <Choice name="checkbox_choice" type="checkbox" value="b">
        Checkbox B
      </Choice>
      <Choice name="checkbox_choice" type="checkbox" value="c">
        Checkbox C
      </Choice>
    </fieldset>

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Checkboxes with children</legend>
      <Choice hint="Checkbox A hint" name="checkbox_choice_children" type="checkbox" value="a">
        Checkbox A
      </Choice>
      <Choice
        defaultChecked
        name="checkbox_choice_children"
        type="checkbox"
        value="b"
        checkedChildren={<div className="ds-c-choice__checkedChild">{childDropdown}</div>}
      >
        Checkbox B - with children
      </Choice>
      <Choice name="checkbox_choice_children" type="checkbox" value="c">
        Checkbox C
      </Choice>
    </fieldset>

    <hr className="ds-u-margin-top--2" />

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Radio buttons</legend>
      <Choice defaultChecked name="radio_choice" type="radio" value="a">
        Radio A
      </Choice>
      <Choice name="radio_choice" type="radio" value="b">
        Radio B
      </Choice>
    </fieldset>

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Radio buttons with multi-level children</legend>
      <Choice name="radio_choice_children" type="radio" value="c">
        Radio A
      </Choice>
      <Choice
        defaultChecked
        name="radio_choice_children"
        type="radio"
        value="d"
        checkedChildren={
          <div className="ds-c-choice__checkedChild">
            <fieldset className="ds-c-fieldset">
              <legend className="ds-c-label">Child Radio buttons with children</legend>
              <Choice name="radio_choice_children1" type="radio" value="child1">
                Child A
              </Choice>
              <Choice
                defaultChecked
                name="radio_choice_children1"
                type="radio"
                value="child2"
                checkedChildren={<div className="ds-c-choice__checkedChild">{childDropdown}</div>}
              >
                Child B - with children
              </Choice>
            </fieldset>
          </div>
        }
      >
        Radio B - with children
      </Choice>
    </fieldset>

    <hr className="ds-u-margin-top--2" />

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Small checkboxes with children</legend>
      <Choice name="checkbox_choice_children_small" size="small" type="checkbox" value="a">
        Checkbox A
      </Choice>
      <Choice
        defaultChecked
        name="checkbox_choice_children_small"
        type="checkbox"
        value="b"
        checkedChildren={
          <div className="ds-c-choice__checkedChild ds-c-choice__checkedChild--small">
            {childDropdown}
          </div>
        }
        size="small"
      >
        Checkbox B - with children
      </Choice>
      <Choice name="checkbox_choice_children_small" size="small" type="checkbox" value="c">
        Checkbox C
      </Choice>
    </fieldset>

    <div className="ds-base ds-base--inverse ds-u-padding--2 ds-u-margin-top--2">
      <fieldset className="ds-c-fieldset ds-u-margin-top--0">
        <legend className="ds-c-label">Inverse radio buttons with children</legend>
        <Choice name="radio_choice_children_inv" type="radio" value="c">
          Radio A
        </Choice>
        <Choice
          defaultChecked
          name="radio_choice_children_inv"
          type="radio"
          value="d"
          checkedChildren={
            <div className="ds-c-choice__checkedChild ds-c-choice__checkedChild--inverse">
              {childDropdown}
            </div>
          }
        >
          Radio B - with children
        </Choice>
      </fieldset>
    </div>

    <hr className="ds-u-margin-top--2" />

    <ControlledChoiceButton />
  </div>,
  document.getElementById('js-example')
);
