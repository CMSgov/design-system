import React, { useState } from 'react';
import Dropdown from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { Dialog } from '../index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

const dropdownOptions = [
  { label: '- Select an option -', value: '' },
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
  { label: 'Cowlitz Indian Tribe', value: '4' },
  {
    label: 'Hoh Indian Tribe (formerly the Hoh Indian Tribe of the Hoh Indian Reservation)',
    value: '5',
  },
  {
    label:
      'Nisqually Indian Tribe (formerly the Nisqually Indian Tribe of the Nisqually Reservation)',
    value: '6',
  },
  { label: 'Lummi Tribe of the Lummi Reservation', value: '7' },
];

const htmlOptGroups = (
  <>
    <option value="">- Select an option -</option>
    <optgroup label="Group A">
      <option value="a-1">Option A-1</option>
      <option value="a-2">Option A-2</option>
      <option value="a-3">Option A-3</option>
    </optgroup>
    <optgroup label="Group B" data-extra-attribute="something">
      <option value="b-1">Option B-1</option>
      <option value="b-2">Option B-2</option>
      <option value="b-3">Option B-3</option>
    </optgroup>
  </>
);

const htmlOptions = (
  <>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8" data-extra-attribute="something">
      Option 8
    </option>
  </>
);

export const Default: Story = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown example',
    name: 'dropdown_field',
  },
};

export const WithError: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Error example',
    name: 'error_dropdown_field',
  },
};

export const Disabled: Story = {
  args: {
    options: dropdownOptions,
    label: 'Disabled example',
    disabled: true,
    name: 'disabled_dropdown_field',
  },
};

export const OptionGroups: Story = {
  args: {
    options: [
      {
        label: 'Group A',
        options: [
          { value: 'a-1', label: 'Option A-1' },
          { value: 'a-2', label: 'Option A-2' },
          { value: 'a-3', label: 'Option A-3' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { value: 'b-1', label: 'Option B-1' },
          { value: 'b-2', label: 'Option B-2' },
          { value: 'b-3', label: 'Option B-3' },
        ],
      },
    ],
    label: 'Option groups example',
    name: 'optgroups_dropdown_field',
  },
};

export const HtmlOptionGroups: Story = {
  args: {
    options: undefined,
    label: 'Option group example',
    name: 'custom_dropdown_field',
    children: htmlOptGroups,
  },
};

export const HtmlOptions: Story = {
  args: {
    options: undefined,
    label: 'Option group example',
    name: 'custom_dropdown_field',
    children: htmlOptions,
  },
};

export const InverseOption: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Inverse example',
    name: 'inverse_dropdown_field',
    inversed: true,
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};

export const Controlled: Story = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown example',
    name: 'dropdown_field',
    value: '3',
  },
  render: function Component(args) {
    const [{ value }, updateArgs] = useArgs();
    const onChange = (event) => {
      action('onChange')(event);
      updateArgs({ value: event.currentTarget.value });
    };
    return <Dropdown {...args} value={value} onChange={onChange} />;
  },
};

export const InDialog: Story = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown example',
    name: 'dropdown_field',
  },
  render: function Component(args) {
    const [show, setShow] = useState(true);

    return (
      <div>
        {show && (
          <Dialog heading="hello" onExit={() => setShow(false)}>
            <Dropdown {...args} />
          </Dialog>
        )}
        <div className="ds-u-measure--base">
          <h1>The United States Constitution</h1>
          <p>
            We the People of the United States, in Order to form a more perfect Union, establish
            Justice, insure domestic Tranquility, provide for the common defence, promote the
            general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do
            ordain and establish this Constitution for the United States of America.
          </p>
          <h2>Article I</h2>
          <h3>Section 1: Congress</h3>
          <p>
            All legislative Powers herein granted shall be vested in a Congress of the United
            States, which shall consist of a Senate and House of Representatives.
          </p>
        </div>
      </div>
    );
  },
};
