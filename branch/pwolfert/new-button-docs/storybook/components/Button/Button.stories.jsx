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
  variation: 'solid',
};

export const AnchorButton = Template.bind({});
AnchorButton.args = {
  href: '!#',
};
AnchorButton.parameters = {
  loki: { skip: true },
};

export const AllButtons = () => {
  return (
    <>
      <Button>Default button</Button>

      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <h4>Default and modified default</h4>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="big">Button</Button>
          <Button>Button</Button>
          <Button size="small">Button</Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="big" disabled>
            Button
          </Button>
          <Button disabled>Button</Button>
          <Button size="small" disabled>
            Button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="big" isAlternate>
            Alt button
          </Button>
          <Button isAlternate>Alt button</Button>
          <Button size="small" isAlternate>
            Alt button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="big" disabled isAlternate>
            Alt button
          </Button>
          <Button disabled isAlternate>
            Alt button
          </Button>
          <Button size="small" disabled isAlternate>
            Alt button
          </Button>
        </div>
        <div
          className="ds-u-fill--base ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark size="big">
              Button on-dark
            </Button>
            <Button onDark>Button on-dark</Button>
            <Button onDark size="small">
              Button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark size="big" disabled>
              Button on-dark
            </Button>
            <Button onDark disabled>
              Button on-dark
            </Button>
            <Button onDark size="small" disabled>
              Button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark size="big" isAlternate>
              Alt button on-dark
            </Button>
            <Button onDark isAlternate>
              Alt button on-dark
            </Button>
            <Button onDark size="small" isAlternate>
              Alt button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark size="big" disabled isAlternate>
              Alt button on-dark
            </Button>
            <Button onDark disabled isAlternate>
              Alt button on-dark
            </Button>
            <Button onDark size="small" disabled isAlternate>
              Alt button on-dark
            </Button>
          </div>
        </div>

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
            Solid alt button
          </Button>
          <Button variation="solid" isAlternate>
            Solid alt button
          </Button>
          <Button variation="solid" size="small" isAlternate>
            Solid alt button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="solid" size="big" disabled isAlternate>
            Solid alt button
          </Button>
          <Button variation="solid" disabled isAlternate>
            Solid alt button
          </Button>
          <Button variation="solid" size="small" disabled isAlternate>
            Solid alt button
          </Button>
        </div>
        <div
          className="ds-u-fill--base ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big">
              Solid button on-dark
            </Button>
            <Button onDark variation="solid">
              Solid button on-dark
            </Button>
            <Button onDark variation="solid" size="small">
              Solid button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" disabled>
              Solid button on-dark
            </Button>
            <Button onDark variation="solid" disabled>
              Solid button on-dark
            </Button>
            <Button onDark variation="solid" size="small" disabled>
              Solid button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" isAlternate>
              Solid alt button on-dark
            </Button>
            <Button onDark variation="solid" isAlternate>
              Solid alt button on-dark
            </Button>
            <Button onDark variation="solid" size="small" isAlternate>
              Solid alt button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="solid" size="big" disabled isAlternate>
              Solid alt button on-dark
            </Button>
            <Button alt onDark variation="solid" disabled isAlternate>
              Solid button on-dark
            </Button>
            <Button onDark variation="solid" size="small" disabled isAlternate>
              Solid alt button on-dark
            </Button>
          </div>
        </div>

        <h4>Ghosts</h4>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="ghost" size="big">
            Ghost button
          </Button>
          <Button variation="ghost">Ghost button</Button>
          <Button variation="ghost" size="small">
            Ghost button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="ghost" size="big" disabled>
            Ghost button
          </Button>
          <Button variation="ghost" disabled>
            Ghost button
          </Button>
          <Button variation="ghost" size="small" disabled>
            Ghost button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="ghost" size="big" isAlternate>
            Ghost alt button
          </Button>
          <Button variation="ghost" isAlternate>
            Ghost alt button
          </Button>
          <Button variation="ghost" size="small" isAlternate>
            Ghost alt button
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variation="ghost" size="big" disabled isAlternate>
            Ghost alt button
          </Button>
          <Button variation="ghost" disabled isAlternate>
            Ghost alt button
          </Button>
          <Button variation="ghost" size="small" disabled isAlternate>
            Ghost alt button
          </Button>
        </div>
        <div
          className="ds-u-fill--base ds-u-padding--2"
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="ghost" size="big">
              Ghost button on-dark
            </Button>
            <Button onDark variation="ghost">
              Ghost button on-dark
            </Button>
            <Button onDark variation="ghost" size="small">
              Ghost button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="ghost" size="big" disabled>
              Ghost button on-dark
            </Button>
            <Button onDark variation="ghost" disabled>
              Ghost button on-dark
            </Button>
            <Button onDark variation="ghost" size="small" disabled>
              Ghost button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="ghost" size="big" isAlternate>
              Ghost alt button on-dark
            </Button>
            <Button onDark variation="ghost" isAlternate>
              Ghost alt button on-dark
            </Button>
            <Button onDark variation="ghost" size="small" isAlternate>
              Ghost alt button on-dark
            </Button>
          </div>
          <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button onDark variation="ghost" size="big" disabled isAlternate>
              Ghost alt button on-dark
            </Button>
            <Button onDark variation="ghost" disabled isAlternate>
              Ghost alt button on-dark
            </Button>
            <Button onDark variation="ghost" size="small" disabled isAlternate>
              Ghost alt button on-dark
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
