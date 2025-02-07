import type { Meta, StoryObj } from '@storybook/react';
import BoxContent from './BoxContent';
import { BoxQuotation } from './BoxQuotation';
import { QuotationMarkIcon } from '../Icons';

const boxContentMeta: Meta = {
  title: 'Components/BoxQuotation',
  component: BoxQuotation,
  argTypes: {
    author: { control: 'text' },
    citation: { control: 'text' },
    children: { control: 'text' },
  },
};
export default boxContentMeta;
type Story = StoryObj<typeof BoxQuotation>;

const BoxQuotationStory: Story = {
  render: ({ ...args }) => {
    return (
      <BoxContent heading={args.heading}>
        <BoxQuotation {...args}>{args.children}</BoxQuotation>
      </BoxContent>
    );
  },
};

export const Default = {
  ...BoxQuotationStory,
  args: {
    citation: <a href="https://home.treasury.gov/">Inflation Reduction Act</a>,
    children:
      "The Inflation Reduction Act keeps these savings and lower costs through 2025. If you qualify for savings, you'll find out the lower costs when you shop for plans.",
    heading: <QuotationMarkIcon />,
  },
};
