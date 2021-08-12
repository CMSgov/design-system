import Pagination from './Pagination';
import React from 'react';
import { shallow } from 'enzyme';

describe('Pagination', () => {
  it('should render component', () => {});
  it('should add custom className if specified', () => {});
  describe('navigation slot behavior', () => {
    it('should hide "previous" navigation slot if current page is first page of set', () => {});
    it('should hide "next" navigation slot if current page is last page of set', () => {});
    it('should render icon specified', () => {});
  });
  describe('pagination slot behavior', () => {
    it('should begin page count with 1', () => {});
    it('should end page count with page total', () => {});
    it('should highlight current page with correct styles', () => {});
    it('should not allow current page to be interactive', () => {});
    it('should show all pages if 7 or fewer pages exist', () => {});
    it('should show an overflow of one page on either side of the current page (previous and next pages) if more than 7 pages exist', () => {});
  });
  describe('with compact prop enabled', () => {
    it('should render compact variant', () => {});
    it('should render non-interactive text nodes in place of pagination slot links', () => {});
  });
});
