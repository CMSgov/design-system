import UsaBanner from './UsaBanner';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof UsaBanner> = {
  component: UsaBanner,
};
export default meta;

type Story = StoryObj<typeof UsaBanner>;

export const Default: Story = {};
