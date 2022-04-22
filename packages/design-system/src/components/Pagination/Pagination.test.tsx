import Pagination from './Pagination';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

function getNav() {
  return screen.getByRole('navigation');
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

describe('Pagination', () => {
  const onPageChange = jest.fn();

  function renderPagination(overrideProps = {}) {
    const props = {
      totalPages: 3,
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
      expect(getNav().getAttribute('aria-label')).toEqual('Pagination');
    });
    it('should set a custom navigation label', () => {
      renderPagination({ totalPages: 8, ariaLabel: 'Pagey page page' });
      expect(getNav().getAttribute('aria-label')).toEqual('Pagey page page');
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
      expect(screen.queryByRole('link', { name: 'Previous Page' })).toBeTruthy();
    });

    it('should hide "previous" navigation slot if current page is first page of set', () => {
      renderPagination({ currentPage: 1 });
      expect(screen.queryByRole('link', { name: 'Previous Page' })).toBeFalsy();
    });

    it('should show "next" navigation slot if current page is not last page of set', () => {
      renderPagination({ currentPage: 2 });
      expect(screen.queryByRole('link', { name: 'Next Page' })).toBeTruthy();
    });

    it('should hide "next" navigation slot if current page is last page of set', () => {
      renderPagination({ currentPage: 3 });
      expect(screen.queryByRole('link', { name: 'Next Page' })).toBeFalsy();
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
      expect(currentPageLink.getAttribute('aria-current')).toEqual('true');
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
        const items = screen.getAllByRole('listitem');
        expect(items.some((item) => item.querySelector('.ds-c-pagination__overflow'))).toBeFalsy();
      });
    });

    //   describe('more than 7 pages', () => {
    //     it('should not show beginning ellipses for pages 1 - 3', () => {
    //       const wrapper1 = renderPagination({ currentPage: 1, totalPages: 35 });
    //       const wrapper2 = renderPagination({ currentPage: 2, totalPages: 35 });
    //       const wrapper3 = renderPagination({ currentPage: 3, totalPages: 35 });

    //       expect(wrapper1.find('Ellipses').length).toBe(1);
    //       let listEl = wrapper1.find('ul');
    //       let secondSlot = listEl.childAt(1).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondSlot).toBeDefined();
    //       expect(secondSlot.text()).toBe('2');

    //       expect(wrapper2.find('Ellipses').length).toBe(1);
    //       listEl = wrapper2.find('ul');
    //       secondSlot = listEl.childAt(1).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondSlot).toBeDefined();
    //       expect(secondSlot.text()).toBe('2');

    //       expect(wrapper3.find('Ellipses').length).toBe(1);
    //       listEl = wrapper3.find('ul');
    //       secondSlot = listEl.childAt(1).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondSlot).toBeDefined();
    //       expect(secondSlot.text()).toBe('2');
    //     });

    //     it('should not show end ellipses for last 3 pages', () => {
    //       const wrapperLast = renderPagination({ currentPage: 35, totalPages: 35 });
    //       const wrapperSecondLast = renderPagination({ currentPage: 34, totalPages: 35 });
    //       const wrapperThirdLast = renderPagination({ currentPage: 33, totalPages: 35 });

    //       expect(wrapperLast.find('Ellipses').length).toBe(1);
    //       let listEl = wrapperLast.find('ul');
    //       let secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondLastSlot).toBeDefined();
    //       expect(secondLastSlot.text()).toBe('34');

    //       expect(wrapperSecondLast.find('Ellipses').length).toBe(1);
    //       listEl = wrapperSecondLast.find('ul');
    //       secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondLastSlot).toBeDefined();
    //       expect(secondLastSlot.text()).toBe('34');

    //       expect(wrapperThirdLast.find('Ellipses').length).toBe(1);
    //       listEl = wrapperThirdLast.find('ul');
    //       secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
    //       expect(listEl.children().length).toBe(7);
    //       expect(secondLastSlot).toBeDefined();
    //       expect(secondLastSlot.text()).toBe('34');
    //     });

    //     it('should show both ellipses for number in middle', () => {
    //       const wrapperEndMiddle = renderPagination({ currentPage: 10, totalPages: 35 });
    //       const wrapperBeginningMiddle = renderPagination({ currentPage: 30, totalPages: 35 });

    //       let listEl = wrapperEndMiddle.find('ul');
    //       expect(listEl.children().length).toBe(7);
    //       expect(wrapperEndMiddle.find('Ellipses').length).toBe(2);

    //       listEl = wrapperBeginningMiddle.find('ul');
    //       expect(wrapperBeginningMiddle.find('Ellipses').length).toBe(2);
    //       expect(listEl.children().length).toBe(7);
    //     });
    //   });
  });

  // describe('with compact prop enabled', () => {
  //   it('should render compact variant', () => {
  //     renderPagination({ currentPage: 2, compact: true });
  //     const compactClassName = 'ds-c-pagination__page-count';

  //     expect(wrapper.find(compactClassName)).toBeTruthy();
  //     expect(wrapper.contains('ul')).toBe(false);
  //     expect(wrapper).toMatchSnapshot();
  //   });

  //   it('should render non-interactive text nodes in place of pagination slot links', () => {
  //     renderPagination({ currentPage: 2, compact: true });
  //     const pages = wrapper.childAt(1);

  //     expect(pages.type()).toEqual('span');
  //     expect(pages.contains('a')).toBe(false);
  //   });
  // });

  // describe('isNavigationHidden', () => {
  //   it('should hide previous when on first page', () => {
  //     renderPagination({ currentPage: 1, isNavigationHidden: true });
  //     const firstChild = wrapper.find('.ds-c-pagination__nav').first();
  //     expect(firstChild.type()).toEqual('span');
  //     expect(firstChild.props().style).toHaveProperty('visibility', 'hidden');
  //   });

  //   it('should hide next when on last page', () => {
  //     renderPagination({ currentPage: 3, isNavigationHidden: true });
  //     const lastChild = wrapper.find('.ds-c-pagination__nav').last();
  //     expect(lastChild.type()).toEqual('span');
  //     expect(lastChild.props().style).toHaveProperty('visibility', 'hidden');
  //   });
  // });
});
