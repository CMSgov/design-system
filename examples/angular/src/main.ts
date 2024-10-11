import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import '@cmsgov/design-system/web-components';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="ds-content">
      <ds-skip-nav href="#main"></ds-skip-nav>
      <ds-usa-banner></ds-usa-banner>
      <main id="main" class="ds-l-container">
        <h1 class="ds-text-heading--4xl ds-u-margin-top--2">Web-component examples</h1>

        <div class="ds-u-measure--base ds-u-padding-bottom--4">
          <p>This is an example showing how to use our library of interactive web components.</p>

          <ds-spinner aria-valuetext="aria sets spinner label!"
            >children don't set spinner label</ds-spinner
          >

          <ds-alert
            variation="success"
            heading="You've loaded the web-components example"
            class-name="ds-u-margin-y--2"
            id="alert"
          >
            <p id="alert-content">
              This is an example of a success alert. If you want to see an error alert, click the
              button below.
            </p>
            <ds-button
              variation="solid"
              is-alternate="true"
              id="the-button"
              class="ds-u-margin-top--1"
              >Break things</ds-button
            >
          </ds-alert>

          <ds-choice type="checkbox" label="I agree to the terms and conditions" name="agree">
            <div slot="checked-children">
              <ds-alert class="ds-u-margin-top--1">Cool, we hoped you'd check this box.</ds-alert>
            </div>
          </ds-choice>

          <ds-accordion bordered="true" class="ds-u-margin-top--2">
            <ds-accordion-item heading="First Amendment" default-open="true">
              <p>
                We the People of the United States, in Order to form a more perfect Union, establish
                Justice, insure domestic Tranquility, provide for the common defence, promote the
                general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity,
                do ordain and establish this Constitution for the United States of America.
              </p>
            </ds-accordion-item>
            <ds-accordion-item heading="Second Amendment">
              <p>
                A well regulated Militia, being necessary to the security of a free State, the right
                of the people to keep and bear Arms, shall not be infringed.
              </p>
            </ds-accordion-item>
          </ds-accordion>

          <ds-month-picker
            requirement-label="Required."
            hint="Select many."
            name="fooPicker"
            label="Select any months you want!"
          >
            <input type="checkbox" value="10" checked />
            <input type="checkbox" value="11" checked disabled />
            <input type="checkbox" value="12" disabled />
          </ds-month-picker>

          <ds-choice-list type="radio" label="Choice list example" name="foo">
            <ds-choice label="Choice without associated children" value="no children" />

            <ds-choice
              label="Checked children"
              hint="Selecting this checkbox will reveal its associated children."
              value="checked children"
            >
              <div slot="checked-children">
                <div class="ds-c-choice__checkedChild">
                  <ds-alert heading="🫣 Tag! You're it!">
                    You can reveal content by applying <code>checked-children</code> to the
                    <code>slot</code> attribute of an HTML element. Do not forget to include a
                    <code>div</code> element with the class
                    <code>ds-c-choice__checkedChild</code> to whatever content you want to show/hide
                    so it gets side border showing an association with its choice parent.
                  </ds-alert>
                </div>
              </div>
            </ds-choice>
            <ds-choice
              label="Unchecked children"
              hint="Selecting this checkbox will hide its associated children."
              value="unchecked children"
            >
              <div slot="unchecked-children">
                <div class="ds-c-choice__checkedChild">
                  <ds-alert variation="warn" heading="I banish thee!">
                    You can hide content by applying <code>unchecked-children</code> to the
                    <code>slot</code> attribute of an HTML element. Do not forget to include a
                    <code>div</code> element with the class
                    <code>ds-c-choice__checkedChild</code> to whatever content you want to show/hide
                    so it gets side border showing an association with its choice parent.
                  </ds-alert>
                </div>
              </div>
            </ds-choice>
          </ds-choice-list>

          <h2 class="ds-text-heading--2xl">Adding machine</h2>
          <form id="calculator">
            <ds-dropdown id="operation" name="operation" label="Operation">
              <option value="addition">Addition</option>
              <option value="subtraction">Subtraction</option>
            </ds-dropdown>
            <div
              class="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2"
              style="gap: var(--spacer-2)"
            >
              <input
                type="number"
                id="a"
                name="a"
                value="20"
                class="ds-c-field ds-c-field--small"
              />
              <span id="sign">+</span>
              <input
                type="number"
                id="b"
                name="b"
                value="30"
                class="ds-c-field ds-c-field--small"
              />
              =
              <output name="result" for="a b"></output>
            </div>
            <ds-button variation="solid" type="submit">Calculate</ds-button>
          </form>

          <hr class="ds-u-margin-y--4" />

          <ds-pagination id="pagination" total-pages="10" class="ds-u-margin-y--4"></ds-pagination>

          <h2 class="ds-text-heading--2xl">Controlled text field example</h2>
          <ds-text-field value="" id="the-text-field" label="Text field example"></ds-text-field>

          <hr class="ds-u-margin-y--4" />

          <h2 class="ds-text-heading--2xl">Autocomplete example</h2>
          <ds-autocomplete
            id="the-autocomplete"
            items='[{"id":"71","name":"Acetaminophen"},{"id":"72","name":"Advil"},{"id":"73","name":"Benadryl"},{"id":"74","name":"Claritin"},{"id":"75","name":"Detrol"},{"id":"76","name":"Excedrin"}]'
            label="Enter and select a drug to see its cost under each plan."
            hint="Type a letter to see results, then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
            clear-search-button="true"
            class-name="ds-u-padding-bottom--7"
          >
          </ds-autocomplete>
        </div>
      </main>
    </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
