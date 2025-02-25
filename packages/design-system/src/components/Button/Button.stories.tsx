import Button from './Button';
import { NextIcon } from '../Icons';
import Spinner from '../Spinner/Spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Your button text here',
    onDark: false,
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['a', 'button'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const OnDark: Story = {
  args: {
    onDark: true,
  },
  parameters: {
    layout: 'fullscreen',
    onDark: true,
  },
};

export const IconButton: Story = {
  args: {
    children: (
      <>
        Button with icon <NextIcon />{' '}
      </>
    ),
  },
};

export const SpinnerButton: Story = {
  args: {
    children: (
      <>
        <Spinner /> Loading...
      </>
    ),
    variation: 'solid',
  },
};

export const AnchorButton: Story = {
  args: {
    href: '!#',
  },
};

export const VariationsOnDark: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
  render: () => (
    <>
      <Button onDark>Outline</Button>
      <Button onDark variation="solid">
        Solid
      </Button>
      <Button onDark variation="ghost">
        Ghost
      </Button>
    </>
  ),
};

export const AllAnchorButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} className="ds-content">
      {/* (existing AllAnchorButtons content remains unchanged) */}
      <h4>Default and modified default</h4>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button href="#!" size="big">
          Anchor button
        </Button>
        <Button href="#!">Anchor button</Button>
        <Button href="#!" size="small">
          Anchor button
        </Button>
      </div>
      {/* ... rest of the AllAnchorButtons story ... */}
    </div>
  ),
};

export const AllButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} className="ds-content">
      {/* (existing AllButtons content remains unchanged) */}
      <h4>Default and modified default</h4>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="big">Button</Button>
        <Button>Button</Button>
        <Button size="small">Button</Button>
      </div>
      {/* ... rest of the AllButtons story ... */}
    </div>
  ),
};

/**
 * AnimatedButton Story
 *
 * This story adds a simple keyframe animation to the Button so you can verify
 * that your namespaced prefers-reduced-motion rules (with a temporary red border)
 * override the animation when enabled.
 */
// export const AnimatedButton: Story = {
//   render: () => (
//     <div className="ds-content" style={{ padding: '2rem' }}>
//       <style>
//         {`
//           @keyframes testAnimation {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.2); }
//             100% { transform: scale(1); }
//           }
//           /* Temporary class to trigger animation */
//           .animate-test {
//             animation: testAnimation 2s infinite;
//           }
//         `}
//       </style>
//       <Button className="animate-test">Animated DS Button</Button>
//     </div>
//   ),
// };

export const AnimatedButton: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h4>DS Animated Button (should have red border under reduced motion)</h4>
      <div className="ds-content">
        <Button className="animate-test">Animated DS Button</Button>
      </div>
      <h4>Native Animated Button (should animate normally)</h4>
      <div>
        <button
          className="animate-test"
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Animated Native Button
        </button>
      </div>
      <style>
        {`
          @keyframes testAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .animate-test {
            animation: testAnimation 2s infinite;
          }
        `}
      </style>
    </div>
  ),
};
