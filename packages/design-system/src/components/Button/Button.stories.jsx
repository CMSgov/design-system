import React from 'react';

import Button from './Button';
import { NextIcon } from '../Icons';
import Spinner from '../Spinner/Spinner';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    // children can be text or a ReactNode. For storybook controls, just allowing strings
    children: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    component: {
      table: {
        disable: true,
      },
    },
    size: {
      options: ['small', 'big'],
    },
    variation: {
      options: ['solid', 'outline', 'link'],
    },
  },
  args: {
    children: 'Your button text here',
    onDark: false,
  },
};

const Template = ({ ...args }) => <Button {...args} />;

export const DefaultButton = Template.bind({});
export const InverseButton = Template.bind({});
InverseButton.args = {
  onDark: true,
};
InverseButton.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'medicare' ? 'Mgov dark' : 'Hcgov dark' },
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: (
    <>
      Button with icon <NextIcon />{' '}
    </>
  ),
};

export const SpinnerButton = Template.bind({});
SpinnerButton.args = {
  children: (
    <>
      <Spinner /> Loading...
    </>
  ),
  variation: 'outline',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  href: '!#',
};
LinkButton.parameters = {
  loki: { skip: true },
};

export const AllButtons = () => {
  return (
    <>
      <Button variation="outline">Default button</Button>

      <h3>Variations: Main</h3>
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <h4>Solids</h4>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="solid" size="big">
            Solid button
          </Button>
          <Button variation="solid">Solid button</Button>
          <Button variation="solid" size="small">
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="solid" size="big" disabled>
            Solid button
          </Button>
          <Button variation="solid" disabled>
            Solid button
          </Button>
          <Button variation="solid" size="small" disabled>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="solid" size="big" isAlternate>
            Solid button
          </Button>
          <Button variation="solid" isAlternate>
            Solid button
          </Button>
          <Button variation="solid" size="small" isAlternate>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="solid" size="big" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="solid" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="solid" size="small" disabled isAlternate>
            Solid button
          </Button>
        </div>
        <div
          className="ds-u-fill--primary-darkest ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big">
              Solid button
            </Button>
            <Button onDark variation="solid">
              Solid button
            </Button>
            <Button onDark variation="solid" size="small">
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" disabled>
              Solid button
            </Button>
            <Button onDark variation="solid" disabled>
              Solid button
            </Button>
            <Button onDark variation="solid" size="small" disabled>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="solid" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="solid" size="small" isAlternate>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="solid" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="solid" size="small" disabled isAlternate>
              Solid button
            </Button>
          </div>
        </div>

        <h4>Outlines</h4>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="outline" size="big">
            Solid button
          </Button>
          <Button variation="outline">Solid button</Button>
          <Button variation="outline" size="small">
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="outline" size="big" disabled>
            Solid button
          </Button>
          <Button variation="outline" disabled>
            Solid button
          </Button>
          <Button variation="outline" size="small" disabled>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="outline" size="big" isAlternate>
            Solid button
          </Button>
          <Button variation="outline" isAlternate>
            Solid button
          </Button>
          <Button variation="outline" size="small" isAlternate>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="outline" size="big" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="outline" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="outline" size="small" disabled isAlternate>
            Solid button
          </Button>
        </div>
        <div
          className="ds-u-fill--primary-darkest ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="outline" size="big">
              Solid button
            </Button>
            <Button onDark variation="outline">
              Solid button
            </Button>
            <Button onDark variation="outline" size="small">
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="outline" size="big" disabled>
              Solid button
            </Button>
            <Button onDark variation="outline" disabled>
              Solid button
            </Button>
            <Button onDark variation="outline" size="small" disabled>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="outline" size="big" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="outline" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="outline" size="small" isAlternate>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="outline" size="big" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="outline" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="outline" size="small" disabled isAlternate>
              Solid button
            </Button>
          </div>
        </div>

        <h4>Links</h4>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="link" size="big">
            Solid button
          </Button>
          <Button variation="link">Solid button</Button>
          <Button variation="link" size="small">
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="link" size="big" disabled>
            Solid button
          </Button>
          <Button variation="link" disabled>
            Solid button
          </Button>
          <Button variation="link" size="small" disabled>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="link" size="big" isAlternate>
            Solid button
          </Button>
          <Button variation="link" isAlternate>
            Solid button
          </Button>
          <Button variation="link" size="small" isAlternate>
            Solid button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="link" size="big" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="link" disabled isAlternate>
            Solid button
          </Button>
          <Button variation="link" size="small" disabled isAlternate>
            Solid button
          </Button>
        </div>
        <div
          className="ds-u-fill--primary-darkest ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="link" size="big">
              Solid button
            </Button>
            <Button onDark variation="link">
              Solid button
            </Button>
            <Button onDark variation="link" size="small">
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="link" size="big" disabled>
              Solid button
            </Button>
            <Button onDark variation="link" disabled>
              Solid button
            </Button>
            <Button onDark variation="link" size="small" disabled>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="link" size="big" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="link" isAlternate>
              Solid button
            </Button>
            <Button onDark variation="link" size="small" isAlternate>
              Solid button
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="link" size="big" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="link" disabled isAlternate>
              Solid button
            </Button>
            <Button onDark variation="link" size="small" disabled isAlternate>
              Solid button
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
