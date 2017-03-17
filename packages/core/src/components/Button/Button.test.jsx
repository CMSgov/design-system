import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Button from './Button.jsx';

describe('Button', function() {
  var labelText = 'required label';

  function testDisabledState(disabled) {
    var onClickMock = jest.fn();
    var props = {
      label: labelText,
      onClick: onClickMock,
      disabled: disabled
    };

    var button = ReactTestUtils.renderIntoDocument(
      React.createElement(Button, props));

    var buttonElement = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    expect(buttonElement.textContent).toBe(labelText);

    // We expect the button to reflect its disabled state
    expect(buttonElement.disabled).toBe(disabled);

    // We also expect the button to have the 'disabled' classname as
    // appropriate for styling.
    var index = buttonElement.className.indexOf('disabled');
    var hasDisabledClassName = index !== -1;
    expect(hasDisabledClassName).toBe(disabled);

    // We finally expect clicks to appropriate trigger the click handler.
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(button));

    var expectedCallCount = disabled ? 0 : 1;
    expect(onClickMock.mock.calls.length).toBe(expectedCallCount);
  }

  it('appears disabled', function() {
    testDisabledState(true);
  });

  it('appears enabled', function() {
    testDisabledState(false);
  });

  it('renders as a green primary button', function() {
    var props = {
      label: labelText
    };

    var button = ReactTestUtils.renderIntoDocument(
      React.createElement(Button, props));

    var buttonElement = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    // Expect the button to be green
    var isGreen = buttonElement.className.indexOf('ds-c-button-success') !== -1;
    expect(isGreen).toBe(true);

    // Expect the button to not be blue
    var isBlue = buttonElement.className.indexOf('ds-c-button-blue') !== -1;
    expect(isBlue).toBe(false);
  });

  it('renders as a blue secondary button', function() {
    var props = {
      label: labelText,
      use: 'secondary'
    };

    var button = ReactTestUtils.renderIntoDocument(
      React.createElement(Button, props));

    var buttonElement = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    // Expect the button to be blue
    var isBlue = buttonElement.className.indexOf('ds-c-button-blue') !== -1;
    expect(isBlue).toBe(true);

    // Expect the button to not be green
    var isGreen = buttonElement.className.indexOf('ds-c-button-success') !== -1;
    expect(isGreen).toBe(false);
  });
});
