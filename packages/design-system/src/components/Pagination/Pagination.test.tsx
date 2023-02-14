import React from 'react';
import Pagination from './Pagination';
import { fireEvent, render, screen } from '@testing-library/react';

function getNav() {
  return screen.getByRole('navigation');
}

function getLabel() {
  return screen.getByRole('heading');
}

function getPrevLink() {
  return screen.getByRole('link', { name: 'Previous Page' });
}

function getNextLink() {
  return screen.getByRole('link', { name: 'Next Page' });
}

function getPageLink(page: number) {
  return screen.getByRole('link', { name: `page ${page}` });
}

function queryPrevLink() {
  return screen.queryByRole('link', { name: 'Previous Page' });
}

function queryNextLink() {
  return screen.queryByRole('link', { name: 'Next Page' });
}

function hasEllipsis() {
  const items = screen.getAllByRole('listitem');
  return items.some((item) => item.querySelector('.ds-c-pagination__overflow'));
}

describe('Pagination', () => {
  const onPageChange = jest.fn();

  function renderPagination(overrideProps = {}) {
    const props = {
      totalPages: 3,
      currentPage: 1,
      onPageChange: onPageChange,
      renderHref: (currentPage) => `#${currentPage}`,
      ...overrideProps,
    };

    return render(<Pagination {...props} />);
  }

  it('should render component', () => {
    const { asFragment } = renderPagination({ currentPage: 2 });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('accessibility attributes', () => {
    it('should have navigation label', () => {
      renderPagination({ totalPages: 8 });
      expect(getLabel().textContent).toContain('Pagination');
      expect(getLabel().textContent).toContain('8');
    });
    it('should set a custom navigation label', () => {
      renderPagination({ totalPages: 8, ariaLabel: 'Pagey page page' });
      expect(getLabel().textContent).toContain('Pagey page page');
    });
  });

  it('should add custom className if specified', () => {
    const customClassName = 'custom-class';
    renderPagination({ totalPages: 8, className: customClassName });
    expect(getNav().classList.contains(customClassName)).toBeTruthy();
  });

  describe('interactivity', () => {
    describe('onPageChange', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call onPageChange when "previous" is pressed', () => {
        renderPagination({ currentPage: 2 });
        fireEvent.click(getPrevLink());

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
      });

      it('should call onPageChange when "next" is pressed', () => {
        renderPagination({ currentPage: 2 });
        fireEvent.click(getNextLink());

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 3);
      });

      it('should call onPageChange when a page is pressed', () => {
        renderPagination({ currentPage: 2 });
        fireEvent.click(getPageLink(1));

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
      });
    });

    describe('href', () => {
      it('should have appropriate href for "previous"', () => {
        renderPagination({ currentPage: 2 });
        expect(getPrevLink().getAttribute('href')).toBe('#1');
      });

      it('should have appropriate href for next page in the page set', () => {
        renderPagination({
          currentPage: 4,
          totalPages: 8,
          renderHref: (currentPage) => `#${currentPage}`,
        });
        expect(getPageLink(5).getAttribute('href')).toBe('#5');
      });

      it('should have appropriate href for "next"', () => {
        renderPagination({ currentPage: 2 });
        expect(getNextLink().getAttribute('href')).toBe('#3');
      });
    });
  });

  describe('navigation slot behavior', () => {
    it('should show "previous" navigation slot if current page is not first page of set', () => {
      renderPagination({ currentPage: 2 });
      expect(queryPrevLink()).toBeTruthy();
    });

    it('should render disabled "previous" navigation slot if current page is first page of set', () => {
      renderPagination({ currentPage: 1 });
      expect(queryPrevLink()).toHaveAttribute('aria-disabled');
      expect(queryPrevLink()).not.toHaveAttribute('href');
    });

    it('should show "next" navigation slot if current page is not last page of set', () => {
      renderPagination({ currentPage: 2 });
      expect(queryNextLink()).toBeTruthy();
    });

    it('should render disabled "next" navigation slot if current page is last page of set', () => {
      renderPagination({ currentPage: 3 });
      expect(queryNextLink()).toHaveAttribute('aria-disabled');
      expect(queryNextLink()).not.toHaveAttribute('href');
    });
  });

  describe('pagination slot behavior', () => {
    it('should begin page count with 1', () => {
      renderPagination({ currentPage: 1 });
      const items = screen.getAllByRole('listitem');
      expect(items[0].textContent).toContain('1');
    });

    it('should end page count with page total', () => {
      const lastPageNum = 3;
      renderPagination({ currentPage: 1, totalPages: lastPageNum });
      const items = screen.getAllByRole('listitem');
      expect(items[items.length - 1].textContent).toContain(`${lastPageNum}`);
    });

    it('should highlight current page with correct styles', () => {
      renderPagination({ currentPage: 3, totalPages: 5 });
      const currentPageLink = screen.getByText('3');
      expect(currentPageLink.getAttribute('aria-current')).toEqual('page');
      expect(currentPageLink.classList.contains('ds-c-pagination__current-page')).toBeTruthy();
    });

    describe('less than 7 pages', () => {
      it('should show all pages', () => {
        const totalPageNum = 5;
        renderPagination({ currentPage: 1, totalPages: totalPageNum });
        const items = screen.getAllByRole('listitem');
        expect(items.length).toEqual(totalPageNum);
        expect(items).toMatchSnapshot();
      });

      it('should not show ellipses', () => {
        renderPagination({ totalPages: 6 });
        expect(hasEllipsis()).toBe(false);
      });
    });

    describe('more than 7 pages', () => {
      describe('should not show beginning ellipses for pages 1 - 3', () => {
        function expectFirstThree() {
          screen.getByText('1');
          screen.getByText('2');
          screen.getByText('3');
          expect(screen.getAllByRole('listitem').length).toBe(7);
        }

        it('for page 1', () => {
          renderPagination({ currentPage: 1, totalPages: 35 });
          expectFirstThree();
        });

        it('for page 2', () => {
          renderPagination({ currentPage: 2, totalPages: 35 });
          expectFirstThree();
        });

        it('for page 3', () => {
          renderPagination({ currentPage: 3, totalPages: 35 });
          expectFirstThree();
        });
      });

      describe('should not show end ellipses for last 3 pages', () => {
        function exectLastThree() {
          screen.getByText('33');
          screen.getByText('34');
          screen.getByText('35');
          expect(screen.getAllByRole('listitem').length).toBe(7);
        }

        it('for page 33', () => {
          renderPagination({ currentPage: 33, totalPages: 35 });
          exectLastThree();
        });

        it('for page 34', () => {
          renderPagination({ currentPage: 34, totalPages: 35 });
          exectLastThree();
        });

        it('for page 35', () => {
          renderPagination({ currentPage: 35, totalPages: 35 });
          exectLastThree();
        });
      });

      describe('should show ellipses for number in middle', () => {
        it('for page 10', () => {
          renderPagination({ currentPage: 10, totalPages: 35 });
          expect(hasEllipsis()).toBe(true);
        });

        it('for page 30', () => {
          renderPagination({ currentPage: 30, totalPages: 35 });
          expect(hasEllipsis()).toBe(true);
        });
      });
    });
  });

  describe('with compact prop enabled', () => {
    it('should render compact variant', () => {
      const { asFragment } = renderPagination({ currentPage: 2, compact: true });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render non-interactive text nodes in place of pagination slot links', () => {
      renderPagination({ currentPage: 2, compact: true });
      expect(screen.queryByRole('list')).toBeFalsy();
    });
  });

  describe('isNavigationHidden', () => {
    it('should hide previous when on first page', () => {
      renderPagination({ currentPage: 1, isNavigationHidden: true });
      // Querying in testing-library will not return hidden items
      expect(queryPrevLink()).toBeFalsy();
    });

    it('should hide next when on last page', () => {
      renderPagination({ currentPage: 3, isNavigationHidden: true });
      // Querying in testing-library will not return hidden items
      expect(queryNextLink()).toBeFalsy();
    });
  });
});
