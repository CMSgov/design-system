import React from 'react';
import Pagination from './Pagination';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {},
  args: {
    totalPages: 15,
  },
};

const Template = ({ ...args }) => {
  const [{ currentPage }, updateArgs] = useArgs();
  const handleSetPage = (evt, page) => {
    evt.preventDefault();
    updateArgs({ currentPage: page });
  };
  return (
    <>
      <div className="ds-u-text-align--center">
        Current page: {currentPage} / {args.totalPages}
      </div>
      <Pagination
        {...args}
        onPageChange={handleSetPage}
        renderHref={(page) => `#/results/${page}`}
      />
    </>
  );
};

export const DefaultPagination = Template.bind({});
