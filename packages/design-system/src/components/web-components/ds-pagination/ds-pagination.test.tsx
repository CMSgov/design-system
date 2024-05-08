import { fireEvent, render, screen } from '@testing-library/react';
import './ds-pagination';

const defaultAttrs = {
  'total-pages': '3',
  'current-page': '1',
  'root-id': 'static-id',
};

function renderPagination(customAttrs = {}) {
  return render(<ds-pagination {...defaultAttrs} {...customAttrs} />);
}

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
  return document.querySelector('.ds-c-pagination__overflow');
}

describe('Pagination', () => {
  it('should render component', () => {
    const { asFragment } = renderPagination({ 'current-page': '2' });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('accessibility attributes', () => {
    it('should have navigation label', () => {
      renderPagination({ 'total-pages': '8' });
      expect(getLabel().textContent).toContain('Pagination');
      expect(getLabel().textContent).toContain('8');
    });

    it('should set a custom navigation label', () => {
      renderPagination({ 'total-pages': '8', ariaLabel: 'Pagey page page' });
      expect(getLabel().textContent).toContain('Pagey page page');
    });
  });

  it('should add custom className if specified', () => {
    const customClassName = 'custom-class';
    renderPagination({ 'total-pages': '8', 'class-name': customClassName });
    expect(getNav().classList.contains(customClassName)).toBeTruthy();
  });

  // describe('interactivity', () => {
  //   describe('onPageChange', () => {
  //     afterEach(() => {
  //       jest.resetAllMocks();
  //     });

  //     it('should call onPageChange when "previous" is pressed', () => {
  //       renderPagination({ 'current-page': '2' });
  //       fireEvent.click(getPrevLink());

  //       expect(onPageChange).toHaveBeenCalledTimes(1);
  //       expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
  //     });

  //     it('should call onPageChange when "next" is pressed', () => {
  //       renderPagination({ 'current-page': '2' });
  //       fireEvent.click(getNextLink());

  //       expect(onPageChange).toHaveBeenCalledTimes(1);
  //       expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 3);
  //     });

  //     it('should call onPageChange when a page is pressed', () => {
  //       renderPagination({ 'current-page': '2' });
  //       fireEvent.click(getPageLink(1));

  //       expect(onPageChange).toHaveBeenCalledTimes(1);
  //       expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
  //     });
  //   });

  //   describe('href', () => {
  //     it('should have appropriate href for "previous"', () => {
  //       renderPagination({ 'current-page': '2' });
  //       expect(getPrevLink().getAttribute('href')).toBe('#1');
  //     });

  //     it('should have appropriate href for next page in the page set', () => {
  //       renderPagination({
  //         'current-page': '4',
  //         'total-pages': '8',
  //         renderHref: (currentPage) => `#${currentPage}`,
  //       });
  //       expect(getPageLink(5).getAttribute('href')).toBe('#5');
  //     });

  //     it('should have appropriate href for "next"', () => {
  //       renderPagination({ 'current-page': '2' });
  //       expect(getNextLink().getAttribute('href')).toBe('#3');
  //     });
  //   });
  // });

  describe('navigation slot behavior', () => {
    it('should show "previous" navigation slot if current page is not first page of set', () => {
      renderPagination({ 'current-page': '2' });
      expect(queryPrevLink()).toBeTruthy();
    });

    it('should render disabled "previous" navigation slot if current page is first page of set', () => {
      renderPagination({ 'current-page': '1' });
      expect(queryPrevLink()).toHaveAttribute('aria-disabled');
      expect(queryPrevLink()).not.toHaveAttribute('href');
    });

    it('should show "next" navigation slot if current page is not last page of set', () => {
      renderPagination({ 'current-page': '2' });
      expect(queryNextLink()).toBeTruthy();
    });

    it('should render disabled "next" navigation slot if current page is last page of set', () => {
      renderPagination({ 'current-page': '3' });
      expect(queryNextLink()).toHaveAttribute('aria-disabled');
      expect(queryNextLink()).not.toHaveAttribute('href');
    });
  });

  describe('pagination slot behavior', () => {
    it('should begin page count with 1', () => {
      const { container } = renderPagination({ 'current-page': '1' });
      const items = container.querySelector('.ds-c-pagination__pages').childNodes;
      expect(items[0].textContent).toContain('1');
    });

    it('should end page count with page total', () => {
      const lastPageNum = '3';
      const { container } = renderPagination({ 'current-page': '1', 'total-pages': lastPageNum });
      const items = container.querySelector('.ds-c-pagination__pages').childNodes;
      expect(items[items.length - 1].textContent).toContain(lastPageNum);
    });

    it('should highlight current page with correct styles', () => {
      renderPagination({ 'current-page': '3', 'total-pages': '5' });
      const currentPageLink = screen.getAllByText('3')[1];
      expect(currentPageLink.getAttribute('aria-current')).toEqual('page');
      expect(currentPageLink.classList.contains('ds-c-pagination__current-page')).toBeTruthy();
    });

    describe('less than 7 pages', () => {
      it('should show all pages', () => {
        const totalPageNum = 5;
        const { container } = renderPagination({
          'current-page': '1',
          'total-pages': `${totalPageNum}`,
        });
        const items = container.querySelector('.ds-c-pagination__pages').childNodes;
        expect(items.length).toEqual(totalPageNum);
        expect(items).toMatchSnapshot();
      });

      it('should not show ellipses', () => {
        renderPagination({ 'total-pages': '6' });
        expect(hasEllipsis()).toBeNull();
      });
    });

    describe('more than 7 pages', () => {
      describe('should not show beginning ellipses for pages 1 - 3', () => {
        function expectFirstThree() {
          screen.getAllByText('1')[1];
          screen.getAllByText('2')[1];
          screen.getAllByText('3')[1];
          expect(screen.getAllByLabelText(/page \d/).length).toBe(7);
        }

        it('for page 1', () => {
          renderPagination({ 'current-page': '1', 'total-pages': '35' });
          expectFirstThree();
        });

        it('for page 2', () => {
          renderPagination({ 'current-page': '2', 'total-pages': '35' });
          expectFirstThree();
        });

        it('for page 3', () => {
          renderPagination({ 'current-page': '3', 'total-pages': '35' });
          expectFirstThree();
        });
      });

      describe('should not show end ellipses for last 3 pages', () => {
        function exectLastThree() {
          screen.getAllByText('33')[1];
          screen.getAllByText('34')[1];
          screen.getAllByText('35')[1];
          expect(screen.getAllByLabelText(/page \d/).length).toBe(7);
        }

        it('for page 33', () => {
          renderPagination({ 'current-page': '33', 'total-pages': '35' });
          exectLastThree();
        });

        it('for page 34', () => {
          renderPagination({ 'current-page': '34', 'total-pages': '35' });
          exectLastThree();
        });

        it('for page 35', () => {
          renderPagination({ 'current-page': '35', 'total-pages': '35' });
          exectLastThree();
        });
      });

      describe('should show ellipses for number in middle', () => {
        it('for page 10', () => {
          renderPagination({ 'current-page': '10', 'total-pages': '35' });
          expect(hasEllipsis()).toBeTruthy();
        });

        it('for page 30', () => {
          renderPagination({ 'current-page': '30', 'total-pages': '35' });
          expect(hasEllipsis()).toBeTruthy();
        });
      });
    });
  });

  describe('with compact prop enabled', () => {
    it('should render compact variant', () => {
      const { asFragment } = renderPagination({ 'current-page': '2', compact: true });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render non-interactive text nodes in place of pagination slot links', () => {
      renderPagination({ 'current-page': '2', compact: true });
      expect(screen.queryByRole('navigation')).toHaveClass('ds-c-pagination--compact');
    });
  });

  describe('is-navigation-hidden', () => {
    it('should hide previous when on first page', () => {
      renderPagination({ 'current-page': '1', 'is-navigation-hidden': true });
      // Querying in testing-library will not return hidden items
      expect(queryPrevLink()).toBeFalsy();
    });

    it('should hide next when on last page', () => {
      renderPagination({ 'current-page': '3', 'is-navigation-hidden': true });
      // Querying in testing-library will not return hidden items
      expect(queryNextLink()).toBeFalsy();
    });
  });
});
