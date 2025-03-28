import type { Meta, StoryObj } from '@storybook/react';
import NoteBox from './NoteBox';
import NoteBoxQuotation from './NoteBoxQuotation';
import { QuotationMarkIcon } from '../Icons';

const boxContentMeta: Meta = {
  title: 'Components/NoteBoxQuotation',
  component: NoteBoxQuotation,
  argTypes: {
    author: { control: 'text' },
    citation: { control: 'text' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['blockquote', 'figure', 'figcaption', 'cite'],
    },
  },
};
export default boxContentMeta;
type Story = StoryObj<typeof NoteBoxQuotation>;

const NoteBoxQuotationStory: Story = {
  render: ({ ...args }) => {
    return (
      <NoteBox heading={<QuotationMarkIcon />}>
        <NoteBoxQuotation {...args}>{args.children}</NoteBoxQuotation>
      </NoteBox>
    );
  },
};

export const Default = {
  ...NoteBoxQuotationStory,
  args: {
    citation: <a href="https://home.treasury.gov/">U.S. Department of the Treasury</a>,
    children:
      "The U.S. Department of the Treasury's mission is to maintain a strong economy and create economic and job opportunities by promoting the conditions that enable economic growth and stability at home and abroad, strengthen national security by combating threats and protecting the integrity of the financial system, and manage the U.S. Government’s finances and resources effectively.",
  },
};

export const WithAuthor = {
  ...NoteBoxQuotationStory,
  args: {
    author: 'John Adams',
    children: 'Let us dare to read, think, speak and write.',
  },
};
