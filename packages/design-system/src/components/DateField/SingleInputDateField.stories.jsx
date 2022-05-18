import React from 'react';
import SingleInputDateField from './SingleInputDateField';

export default {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  argTypes: {},
};

const Template = ({ ...args }) => <SingleInputDateField {...args} />;

export const SingleInputDateFieldDefault = Template.bind({});
