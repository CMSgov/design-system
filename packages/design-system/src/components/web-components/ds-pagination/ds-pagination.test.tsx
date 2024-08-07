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

describe('Pagination', () => {
  it('should render component', () => {
    const { asFragment } = renderPagination({ 'current-page': '2' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add custom className if specified', () => {
    const customClassName = 'custom-class';
    renderPagination({ 'total-pages': '8', 'class-name': customClassName });
    expect(getNav().classList.contains(customClassName)).toBeTruthy();
  });

  it('should accept a custom href-template', () => {
    renderPagination({ 'current-page': '2', 'href-template': '/hello-world/{page}/' });
    expect(getPrevLink().getAttribute('href')).toBe('/hello-world/1/');
  });

  describe('accessibility attributes', () => {
    it('should have navigation label', () => {
      renderPagination({ 'total-pages': '8' });
      expect(getLabel().textContent).toContain('Pagination');
      expect(getLabel().textContent).toContain('8');
    });

    it('should set a custom heading-aria-label', () => {
      renderPagination({ 'total-pages': '8', 'heading-aria-label': 'Pagey page page' });
      expect(getLabel().textContent).toContain('Pagey page page');
    });
  });

  describe('interactivity', () => {
    describe('onPageChange', () => {
      function bindHandler() {
        const root = document.querySelector('ds-pagination');
        const mockHandler = jest.fn();
        root.addEventListener('ds-page-change', mockHandler);
        return mockHandler;
      }

      it('should call onPageChange when "previous" is pressed', () => {
        renderPagination({ 'current-page': '2' });
        const onPageChange = bindHandler();
        fireEvent.click(getPrevLink());
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.lastCall[0].detail.page).toEqual(1);
      });

      it('should call onPageChange when "next" is pressed', () => {
        renderPagination({ 'current-page': '2' });
        const onPageChange = bindHandler();
        fireEvent.click(getNextLink());
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.lastCall[0].detail.page).toEqual(3);
      });

      it('should call onPageChange when a page is pressed', () => {
        renderPagination({ 'current-page': '2' });
        const onPageChange = bindHandler();
        fireEvent.click(getPageLink(1));
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.lastCall[0].detail.page).toEqual(1);
      });
    });

    describe('href', () => {
      it('should have appropriate href for "previous"', () => {
        renderPagination({ 'current-page': '2' });
        expect(getPrevLink().getAttribute('href')).toBe('#page=1');
      });

      it('should have appropriate href for next page in the page set', () => {
        renderPagination({
          'current-page': '4',
          'total-pages': '8',
        });
        expect(getPageLink(5).getAttribute('href')).toBe('#page=5');
      });

      it('should have appropriate href for "next"', () => {
        renderPagination({ 'current-page': '2' });
        expect(getNextLink().getAttribute('href')).toBe('#page=3');
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
