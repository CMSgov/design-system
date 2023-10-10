import React, { useState } from 'react';
import Dropdown from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { Dialog } from '../index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    name: 'dropdown-field',
  },
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
  },
};

export const WithError: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Error example',
  },
};

export const Disabled: Story = {
  args: {
    options: dropdownOptions,
    label: 'Disabled example',
    disabled: true,
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
  },
};

export const HtmlOptionGroups: Story = {
  args: {
    options: undefined,
    label: 'Option group example',
    children: htmlOptGroups,
  },
};

export const HtmlOptions: Story = {
  args: {
    options: undefined,
    label: 'Option group example',
    children: htmlOptions,
  },
};

export const InverseOption: Story = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Inverse example',
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

export const TapThrough: Story = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown with other items',
  },
  render: function Component(args) {
    const onClick = (event) => {
      action('red button activated!')(event);
      alert('ahhh!');
    };

    return (
      <div>
        <Dropdown {...args} />
        <div className="ds-u-margin-top--2">
          <button
            style={{ background: 'red', padding: '16px 32px', color: 'white' }}
            onClick={onClick}
          >
            Donʼt press this button!
          </button>
        </div>
      </div>
    );
  },
};
