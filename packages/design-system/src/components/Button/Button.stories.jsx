import React from 'react';
import Button from './Button';
import { NextIcon } from '../Icons';
import Spinner from '../Spinner/Spinner';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
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
      options: ['solid', 'ghost'],
    },
  },
  args: {
    children: 'Your button text here',
    onDark: false,
  },
};

const Template = ({ ...args }) => <Button {...args} />;

export const Default = Template.bind({});
export const OnDark = Template.bind({});
OnDark.args = {
  onDark: true,
};
OnDark.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
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

export const VariationsOnDark = () => (
  <>
    <Button onDark>Outline</Button>
    <Button onDark variation="solid">
      Solid
    </Button>
    <Button onDark variation="ghost">
      Ghost
    </Button>
  </>
);
VariationsOnDark.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};
VariationsOnDark.decorators = [
  (Story) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Story />
    </div>
  ),
];

export const AllAnchorButtons = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} className="ds-content">
      <h4>Default and modified default</h4>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" size="big">
          Anchor button
        </Button>
        <Button href="#!">Anchor button</Button>
        <Button href="#!" size="small">
          Anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" size="big" disabled>
          Anchor button
        </Button>
        <Button href="#!" disabled>
          Anchor button
        </Button>
        <Button href="#!" size="small" disabled>
          Anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" size="big" isAlternate>
          Alt anchor button
        </Button>
        <Button href="#!" isAlternate>
          Alt anchor button
        </Button>
        <Button href="#!" size="small" isAlternate>
          Alt anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" size="big" disabled isAlternate>
          Alt anchor button
        </Button>
        <Button href="#!" disabled isAlternate>
          Alt anchor button
        </Button>
        <Button href="#!" size="small" disabled isAlternate>
          Alt anchor button
        </Button>
      </div>
      <div
        className="ds-u-fill--base ds-u-padding--2"
        style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark size="big">
            Anchor button on-dark
          </Button>
          <Button href="#!" onDark>
            Anchor button on-dark
          </Button>
          <Button href="#!" onDark size="small">
            Anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark size="big" disabled>
            Anchor button on-dark
          </Button>
          <Button href="#!" onDark disabled>
            Anchor button on-dark
          </Button>
          <Button href="#!" onDark size="small" disabled>
            Anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark size="big" isAlternate>
            Alt anchor button on-dark
          </Button>
          <Button href="#!" onDark isAlternate>
            Alt anchor button on-dark
          </Button>
          <Button href="#!" onDark size="small" isAlternate>
            Alt anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark size="big" disabled isAlternate>
            Alt anchor button on-dark
          </Button>
          <Button href="#!" onDark disabled isAlternate>
            Alt anchor button on-dark
          </Button>
          <Button href="#!" onDark size="small" disabled isAlternate>
            Alt anchor button on-dark
          </Button>
        </div>
      </div>

      <h4>Solids</h4>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="solid" size="big">
          Solid anchor button
        </Button>
        <Button href="#!" variation="solid">
          Solid anchor button
        </Button>
        <Button href="#!" variation="solid" size="small">
          Solid anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="solid" size="big" disabled>
          Solid anchor button
        </Button>
        <Button href="#!" variation="solid" disabled>
          Solid anchor button
        </Button>
        <Button href="#!" variation="solid" size="small" disabled>
          Solid anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="solid" size="big" isAlternate>
          Solid alt anchor button
        </Button>
        <Button href="#!" variation="solid" isAlternate>
          Solid alt anchor button
        </Button>
        <Button href="#!" variation="solid" size="small" isAlternate>
          Solid alt anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="solid" size="big" disabled isAlternate>
          Solid alt anchor button
        </Button>
        <Button href="#!" variation="solid" disabled isAlternate>
          Solid alt anchor button
        </Button>
        <Button href="#!" variation="solid" size="small" disabled isAlternate>
          Solid alt anchor button
        </Button>
      </div>
      <div
        className="ds-u-fill--base ds-u-padding--2"
        style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="solid" size="big">
            Solid anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid">
            Solid anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" size="small">
            Solid anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="solid" size="big" disabled>
            Solid anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" disabled>
            Solid anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" size="small" disabled>
            Solid anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="solid" size="big" isAlternate>
            Solid alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" isAlternate>
            Solid alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" size="small" isAlternate>
            Solid alt anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="solid" size="big" disabled isAlternate>
            Solid alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" disabled isAlternate>
            Solid anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="solid" size="small" disabled isAlternate>
            Solid alt anchor button on-dark
          </Button>
        </div>
      </div>

      <h4>Ghosts</h4>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="ghost" size="big">
          Ghost anchor button
        </Button>
        <Button href="#!" variation="ghost">
          Ghost anchor button
        </Button>
        <Button href="#!" variation="ghost" size="small">
          Ghost anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="ghost" size="big" disabled>
          Ghost anchor button
        </Button>
        <Button href="#!" variation="ghost" disabled>
          Ghost anchor button
        </Button>
        <Button href="#!" variation="ghost" size="small" disabled>
          Ghost anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="ghost" size="big" isAlternate>
          Ghost alt anchor button
        </Button>
        <Button href="#!" variation="ghost" isAlternate>
          Ghost alt anchor button
        </Button>
        <Button href="#!" variation="ghost" size="small" isAlternate>
          Ghost alt anchor button
        </Button>
      </div>
      <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" variation="ghost" size="big" disabled isAlternate>
          Ghost alt anchor button
        </Button>
        <Button href="#!" variation="ghost" disabled isAlternate>
          Ghost alt anchor button
        </Button>
        <Button href="#!" variation="ghost" size="small" disabled isAlternate>
          Ghost alt anchor button
        </Button>
      </div>
      <div
        className="ds-u-fill--base ds-u-padding--2"
        style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="ghost" size="big">
            Ghost anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost">
            Ghost anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" size="small">
            Ghost anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="ghost" size="big" disabled>
            Ghost anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" disabled>
            Ghost anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" size="small" disabled>
            Ghost anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="ghost" size="big" isAlternate>
            Ghost alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" isAlternate>
            Ghost alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" size="small" isAlternate>
            Ghost alt anchor button on-dark
          </Button>
        </div>
        <div className="" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button href="#!" onDark variation="ghost" size="big" disabled isAlternate>
            Ghost alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" disabled isAlternate>
            Ghost alt anchor button on-dark
          </Button>
          <Button href="#!" onDark variation="ghost" size="small" disabled isAlternate>
            Ghost alt anchor button on-dark
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AllButtons = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} className="ds-content">
      <h4>Default and modified default</h4>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="big">Button</Button>
        <Button>Button</Button>
        <Button size="small">Button</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="big" disabled>
          Button
        </Button>
        <Button disabled>Button</Button>
        <Button size="small" disabled>
          Button
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="big" isAlternate>
          Alt button
        </Button>
        <Button isAlternate>Alt button</Button>
        <Button size="small" isAlternate>
          Alt button
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button onDark size="big">
            Button on-dark
          </Button>
          <Button onDark>Button on-dark</Button>
          <Button onDark size="small">
            Button on-dark
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variation="solid" size="big">
          Solid button
        </Button>
        <Button variation="solid">Solid button</Button>
        <Button variation="solid" size="small">
          Solid button
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button onDark variation="solid" size="big" disabled isAlternate>
            Solid alt button on-dark
          </Button>
          <Button onDark variation="solid" disabled isAlternate>
            Solid button on-dark
          </Button>
          <Button onDark variation="solid" size="small" disabled isAlternate>
            Solid alt button on-dark
          </Button>
        </div>
      </div>

      <h4>Ghosts</h4>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variation="ghost" size="big">
          Ghost button
        </Button>
        <Button variation="ghost">Ghost button</Button>
        <Button variation="ghost" size="small">
          Ghost button
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
  );
};
