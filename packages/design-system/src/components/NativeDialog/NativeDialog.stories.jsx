import React, { Component, useState } from 'react';
import { NativeDialog as DialogComponent } from './NativeDialog';

export default {
  title: 'Components/Native Dialog',
  component: DialogComponent,
  args: {},
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const Template = ({ data, ...args }) => <DialogComponent {...args} />;

const Modal = Template.bind({});

const Drawer = Template.bind({});
