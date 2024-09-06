import Pagination from './Pagination';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination as any,
  args: {
    currentPage: 1,
    totalPages: 15,
  },
  argTypes: {
    ariaLabel: {
      table: {
        defaultValue: {
          summary: 'Pagination results',
        },
      },
    },
    endAriaLabel: {
      table: {
        defaultValue: {
          summary: 'Next Page',
        },
      },
    },
    endLabelText: {
      table: {
        defaultValue: {
          summary: 'Next',
        },
      },
    },
    startAriaLabel: {
      table: {
        defaultValue: {
          summary: 'Previous Page',
        },
      },
    },
    startLabelText: {
      table: {
        defaultValue: {
          summary: 'Previous',
        },
      },
    },
  },
  render: function Component(args) {
    const [{ currentPage }, updateArgs] = useArgs();
    const handleSetPage = (evt, page) => {
      evt.preventDefault();
      action('onPageChange')(evt, page);
      updateArgs({ currentPage: page });
    };
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handleSetPage}
        renderHref={(page) => `#/results/${page}`}
      />
    );
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const HiddenNavigation: Story = {
  args: {
    isNavigationHidden: true,
  },
};

export const CompactNavigation: Story = {
  args: {
    compact: true,
  },
};
