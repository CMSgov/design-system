import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import Alert from './Alert';

const meta: Meta = {
  component: Alert,
  argTypes: {
    children: { control: 'text' },
    // @TODO: deprecate, there is only one option: 'lightweight'
    weight: { table: { disable: true } },
  },
  args: {
    hideIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;
const AlertTemplate: Story = {
  render: ({ ...args }) => {
    return <Alert {...args}>{args.children}</Alert>;
  },
};

export const Default = {
  ...AlertTemplate,
  args: {
    heading: 'Eu irure do aute in eiusmod',
    children:
      'Sunt laborum et labore ea duis amet eu voluptate mollit. Cillum sint reprehenderit amet incididunt id irure. Sunt non labore irure nisi dolor ea ut quis excepteur enim aliquip. Consequat incididunt voluptate esse quis cillum esse nisi.',
  },
};

export const WithNodeChildren: Story = {
  args: {
    heading: 'Aute laboris aliquip duis ad voluptate adipisicing sunt nisi irure adipisicing',
    children: (
      <>
        <p className="ds-c-alert__text">
          Occaecat irure minim velit qui deserunt <a href="https://design.cms.gov/">anim nisi</a>{' '}
          cupidatat. Consectetur nostrud laborum id laboris qui officia fugiat pariatur enim nulla
          nisi aute ut. Dolor ullamco aliquip esse officia. Ut pariatur qui eiusmod sunt anim
          voluptate duis velit tempor anim adipisicing consectetur ea nulla. Consequat commodo ad ex
          nulla sit deserunt officia culpa.
        </p>
        <div className="ds-u-margin-top--2">
          <Button variation="solid">Primary action</Button>
          <Button className="ds-u-margin-left--1">Secondary action</Button>
        </div>
      </>
    ),
  },
};

export const WithoutChildren = {
  ...AlertTemplate,
  args: {
    heading: 'Exercitation esse anim ex adipisicing anim voluptate velit minim',
    children: null,
  },
};

export const WithoutHeading = {
  ...AlertTemplate,
  args: {
    heading: null,
    children:
      'Elit excepteur dolore voluptate amet. Elit dolor culpa qui laboris veniam id elit consectetur sint. Sint est irure velit nostrud et adipisicing cillum consectetur labore Lorem eiusmod ut veniam. Sint occaecat reprehenderit ex eiusmod incididunt.',
  },
};

export const WithoutIcon = {
  ...AlertTemplate,
  args: {
    heading: 'Reprehenderit aliquip exercitation ad aliquip',
    children:
      'Et minim velit cillum laboris aliquip in irure id duis fugiat. Dolor cillum enim ea culpa. Culpa commodo labore consectetur culpa irure excepteur.',
    hideIcon: true,
  },
};

export const Lightweight = {
  ...AlertTemplate,
  args: {
    heading: 'Nisi id esse dolor ipsum eu ea fugiat nulla cillum',
    children:
      'Excepteur dolore esse occaecat tempor elit aute id consectetur dolor excepteur nulla tempor quis. Minim nisi ut voluptate ipsum cillum ullamco. Qui sit laboris pariatur pariatur. Excepteur amet est exercitation occaecat dolore ea proident nostrud reprehenderit id sit esse. Aliqua duis est dolor laboris ea consequat voluptate ex pariatur sunt aliquip consequat esse. Et enim enim sint labore velit culpa est tempor nisi.',
    weight: 'lightweight',
  },
};

export const Success = {
  ...AlertTemplate,
  args: {
    heading: 'Elit duis ipsum eu esse id elit laborum id et reprehenderit aute',
    children:
      'Deserunt in do reprehenderit aliqua. Velit dolor nulla enim cupidatat exercitation duis cupidatat fugiat eiusmod ullamco occaecat. Occaecat dolor Lorem est esse quis eiusmod excepteur aute in magna magna duis laboris. Proident duis irure anim duis. Lorem pariatur ex ea aliqua nisi laborum est ullamco ea ex ullamco eu non.',
    variation: 'success',
  },
};

export const Warning = {
  ...AlertTemplate,
  args: {
    heading: 'Minim ex adipisicing adipisicing est ea',
    children:
      'Et aute irure aliquip minim minim dolor reprehenderit. Qui pariatur elit incididunt duis esse ut. Officia anim elit ea velit incididunt laboris quis incididunt ipsum mollit proident non. Magna officia irure labore non culpa cillum. Amet commodo Lorem elit mollit exercitation. Cupidatat aliqua culpa proident eiusmod eiusmod labore eu ipsum incididunt et.',
    variation: 'warn',
  },
};

export const Error = {
  ...AlertTemplate,
  args: {
    heading: 'Mollit ad do amet incididunt ullamco ullamco',
    children:
      'Fugiat elit commodo nulla sint quis dolore in. Elit Lorem voluptate elit proident exercitation consequat labore culpa commodo duis. Incididunt laborum duis veniam ipsum velit. Voluptate tempor voluptate eu do cupidatat occaecat labore Lorem. Labore exercitation voluptate aliquip labore Lorem ea mollit duis.',
    variation: 'error',
  },
};
