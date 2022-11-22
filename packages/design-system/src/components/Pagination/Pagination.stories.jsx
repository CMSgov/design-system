import React from 'react';
import Pagination from './Pagination';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {},
  args: {
    currentPage: 1,
    totalPages: 15,
  },
};

const Template = ({ ...args }) => {
  const [{ currentPage }, updateArgs] = useArgs({ currentPage: 1 });
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
};

export const Default = Template.bind({});
export const HiddenNavigation = Template.bind({});
HiddenNavigation.args = {
  isNavigationHidden: true,
};
export const CompactNavigation = Template.bind({});
CompactNavigation.args = {
  compact: true,
};
