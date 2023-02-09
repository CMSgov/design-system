import React from 'react';

export default {
  title: 'Reset / Form Elements',
};

export const FormElements = () => {
  return (
    <article>
      <hgroup>
        <h2>Form Elements</h2>
        <p>This page showcases how reset styles impact HTML form element tags.</p>
      </hgroup>

      <article>
        <h3>Text fields</h3>

        <h4>Text inputs</h4>
        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Text input examples</legend>
              <label htmlFor="text-input">Default text input field</label>
              <input type="text" name="text-inputs" id="text-input" />
              <br />
              <label htmlFor="disabled-text-input">Disabled text input field</label>
              <input type="text" name="text-inputs" id="disabled-text-input" disabled />
            </fieldset>
          </form>
        </div>

        <h4>Multi-line inputs (text area fields))</h4>
        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Multi-line input examples</legend>
              <label htmlFor="text-area-input">Default multi-line input</label>
              <textarea name="text-area-inputs" id="text-area-input" rows={3}></textarea>
              <br />
              <label htmlFor="disabled-text-area-input">Disabled multi-line input</label>
              <textarea
                name="text-area-inputs"
                id="disabled-text-area-input"
                rows={3}
                disabled
              ></textarea>
            </fieldset>
          </form>
        </div>
      </article>

      <article>
        <h3>Choice elements</h3>

        <h4>Select (dropdown)</h4>
        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Select fields</legend>

              <label htmlFor="select-field">Default select field</label>
              <select name="select-fields" id="select-field">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
              </select>
              <br />
              <label htmlFor="disabled-select-field">Disabled select field</label>
              <select name="select-fields" id="disabled-select-field" disabled>
                <option value="">-- Select an option --</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
              </select>
            </fieldset>
          </form>
        </div>

        <h4>Checkbox</h4>
        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Checkboxes</legend>
              <input type="checkbox" name="checkboxes" id="checked-checkbox" checked />
              <label htmlFor="checked-checkbox">Checked checkbox</label>
              <br />
              <input type="checkbox" name="checkboxes" id="checkbox" />
              <label htmlFor="checkbox">Default checkbox</label>
              <br />
              <input type="checkbox" name="checkboxes" id="disabled-checkbox" disabled />
              <label htmlFor="disabled-checkbox">Disabled checkbox</label>
            </fieldset>
          </form>
        </div>

        <h4>Radio button</h4>
        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Radio buttons</legend>
              <input type="radio" name="radios" id="checked-radio" checked />
              <label htmlFor="checked-radio">Checked radio button</label>
              <br />
              <input type="radio" name="radios" id="radio" />
              <label htmlFor="radio">Default radio button</label>
              <br />
              <input type="radio" name="radios" id="disabled-radio" disabled />
              <label htmlFor="disabled-radio">Disabled radio button</label>
            </fieldset>
          </form>
        </div>
      </article>

      <article>
        <h3>Buttons</h3>

        <div className="preview">
          <form action="">
            <fieldset>
              <legend>Legend: Buttons</legend>
              <button type="button">Button</button>
              <button type="reset">Reset button</button>
              <button type="submit">Submit button</button>
              <button type="button" disabled>
                Disabled button
              </button>
              <button type="reset" disabled>
                Disabled reset button
              </button>
              <button type="submit" disabled>
                Disabled submit button
              </button>
            </fieldset>
          </form>
        </div>
      </article>
    </article>
  );
};
