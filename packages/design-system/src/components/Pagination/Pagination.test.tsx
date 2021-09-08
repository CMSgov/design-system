import './matchMedia.mock';
import { mount, shallow } from 'enzyme';
import Pagination from './Pagination';
import React from 'react';

describe('Pagination', () => {
  const pageButtonSelector = '.ds-c-button';
  const onPageChange = jest.fn();

  const render = (overrideProps = {}, shouldDeepRender = false) => {
    const props = {
      totalPages: 3,
      onPageChange: onPageChange,
      ...overrideProps,
    };

    return shouldDeepRender ? mount(<Pagination {...props} />) : shallow(<Pagination {...props} />);
  };

  it('should render component', () => {
    const wrapper = render({ currentPage: 2 });
    expect(wrapper.is('nav')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  describe('accessibility attributes', () => {
    it('should have navigation label', () => {
      const wrapper = render({ totalPages: 8 });
      expect(wrapper.prop('aria-label')).toEqual('Pagination');
    });
    it('should set a custom navigation label', () => {
      const wrapper = render({ totalPages: 8, ariaLabel: 'Pagey page page' });
      expect(wrapper.prop('aria-label')).toEqual('Pagey page page');
    });
  });

  it('should add custom className if specified', () => {
    const customClassName = 'custom-class';
    const wrapper = render({ totalPages: 8, className: customClassName });
    expect(wrapper.hasClass(customClassName)).toBeTruthy();
  });

  describe('interactivity', () => {
    describe('onPageChange', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should call onPageChange when "previous" is pressed', () => {
        const wrapper = render({ currentPage: 2 });
        wrapper.childAt(0).simulate('click', {});

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
      });

      it('should call onPageChange when "next" is pressed', () => {
        const wrapper = render({ currentPage: 2 });
        wrapper.childAt(2).simulate('click', {});

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 3);
      });

      it('should call onPageChange when a page is pressed', () => {
        const wrapper = render({ currentPage: 2 }, true);
        wrapper.find('ol').childAt(0).find(pageButtonSelector).simulate('click', {});

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
      });
    });

    describe('href', () => {
      it('should have appropriate href for "previous"', () => {
        const wrapper = render({ currentPage: 2 });
        const prevEl = wrapper.childAt(0);

        expect(prevEl.prop('href')).toBe('#1');
      });

      it('should have appropriate href for "next"', () => {
        const wrapper = render({ currentPage: 2 });
        const nextEl = wrapper.childAt(2);

        expect(nextEl.prop('href')).toBe('#3');
      });

      it('should have appropriate href for page', () => {
        const wrapper = render({ currentPage: 2, totalPages: 5 }, true);
        const pageEl = wrapper.find('ol').childAt(3).find(pageButtonSelector);

        expect(pageEl.prop('href')).toBe('#4');
      });
    });
    describe('custom URL', () => {
      const customUrl = 'test.com';

      it('should have appropriate href for "previous"', () => {
        const wrapper = render({ currentPage: 2, customUrl: customUrl });
        const prevEl = wrapper.childAt(0);

        expect(prevEl.prop('href')).toBe(`${customUrl}/1`);
      });

      it('should have appropriate href for "next"', () => {
        const wrapper = render({ currentPage: 2, customUrl: customUrl });
        const nextEl = wrapper.childAt(2);

        expect(nextEl.prop('href')).toBe(`${customUrl}/3`);
      });

      it('should have appropriate href for page', () => {
        const wrapper = render({ currentPage: 2, totalPages: 5, customUrl: customUrl }, true);
        const pageEl = wrapper.find('ol').childAt(3).find(pageButtonSelector);

        expect(pageEl.prop('href')).toBe(`${customUrl}/4`);
      });
    });
  });

  describe('navigation slot behavior', () => {
    it('should show "previous" navigation slot if current page is not first page of set', () => {
      const wrapper = render({ currentPage: 2 });
      const firstChild = wrapper.childAt(0);
      expect(firstChild.dive().type()).toEqual('a');
      expect(firstChild.dive().text()).toEqual('Previous');
    });

    it('should hide "previous" navigation slot if current page is first page of set', () => {
      const wrapper = render({ currentPage: 1 });
      const prevButton = wrapper.childAt(0);
      expect(prevButton.prop('style')).toHaveProperty('visibility', 'hidden');
    });

    it('should show "next" navigation slot if current page is not last page of set', () => {
      const wrapper = render({ currentPage: 2 });
      const lastChild = wrapper.children().last();
      expect(lastChild.dive().type()).toEqual('a');
      expect(lastChild.dive().text()).toEqual('Next');
    });

    it('should hide "next" navigation slot if current page is last page of set', () => {
      const wrapper = render({ currentPage: 3 });
      const lastChild = wrapper.children().last();
      expect(lastChild.prop('style')).toHaveProperty('visibility', 'hidden');
    });
  });

  describe('pagination slot behavior', () => {
    it('should begin page count with 1', () => {
      const wrapper = render({ currentPage: 1 });
      const firstPage = wrapper.find('ol').childAt(0).dive().find(pageButtonSelector);

      expect(firstPage).toBeDefined();
      expect(firstPage.text()).toBe('1');
    });

    it('should end page count with page total', () => {
      const lastPageNum = 3;
      const wrapper = render({ currentPage: 1, totalPages: lastPageNum }, true);
      const lastPage = wrapper.find('ol').childAt(2).find(pageButtonSelector);

      expect(lastPage).toBeDefined();
      expect(lastPage.text()).toBe(`${lastPageNum}`);
    });

    it('should highlight current page with correct styles', () => {
      const wrapper = render({ currentPage: 3, totalPages: 5 });
      const currentPageEl = wrapper.find('ol').childAt(2).dive().find(pageButtonSelector);

      expect(currentPageEl.type()).toEqual('span');
      expect(currentPageEl.prop('aria-current')).toEqual('true');
      expect(currentPageEl.hasClass('ds-c-pagination__current-page')).toBeTruthy();
    });

    describe('less than 7 pages', () => {
      it('should show all pages', () => {
        const totalPageNum = 5;
        const wrapper = render({ currentPage: 1, totalPages: totalPageNum });
        const listEl = wrapper.find('ol');
        const pageItems = listEl.children();

        expect(pageItems.length).toEqual(totalPageNum);
        expect(listEl).toMatchSnapshot();
      });

      it('should never show ellipses', () => {
        const wrapper = render({ totalPages: 6 });

        expect(wrapper.find('Ellipses').length).toBe(0);
      });
    });

    describe('more than 7 pages', () => {
      it('should not show beginning ellipses for pages 1 - 3', () => {
        const wrapper1 = render({ currentPage: 1, totalPages: 35 }, true);
        const wrapper2 = render({ currentPage: 2, totalPages: 35 }, true);
        const wrapper3 = render({ currentPage: 3, totalPages: 35 }, true);

        expect(wrapper1.find('Ellipses').length).toBe(1);
        let listEl = wrapper1.find('ol');
        let secondSlot = listEl.childAt(1).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');

        expect(wrapper2.find('Ellipses').length).toBe(1);
        listEl = wrapper2.find('ol');
        secondSlot = listEl.childAt(1).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');

        expect(wrapper3.find('Ellipses').length).toBe(1);
        listEl = wrapper3.find('ol');
        secondSlot = listEl.childAt(1).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');
      });

      it('should not show end ellipses for last 3 pages', () => {
        const wrapperLast = render({ currentPage: 35, totalPages: 35 }, true);
        const wrapperSecondLast = render({ currentPage: 34, totalPages: 35 }, true);
        const wrapperThirdLast = render({ currentPage: 33, totalPages: 35 }, true);

        expect(wrapperLast.find('Ellipses').length).toBe(1);
        let listEl = wrapperLast.find('ol');
        let secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');

        expect(wrapperSecondLast.find('Ellipses').length).toBe(1);
        listEl = wrapperSecondLast.find('ol');
        secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');

        expect(wrapperThirdLast.find('Ellipses').length).toBe(1);
        listEl = wrapperThirdLast.find('ol');
        secondLastSlot = listEl.childAt(5).find(pageButtonSelector);
        expect(listEl.children().length).toBe(7);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');
      });

      it('should show both ellipses for number in middle', () => {
        const wrapperEndMiddle = render({ currentPage: 10, totalPages: 35 });
        const wrapperBeginningMiddle = render({ currentPage: 30, totalPages: 35 });

        let listEl = wrapperEndMiddle.find('ol');
        expect(listEl.children().length).toBe(7);
        expect(wrapperEndMiddle.find('Ellipses').length).toBe(2);

        listEl = wrapperBeginningMiddle.find('ol');
        expect(wrapperBeginningMiddle.find('Ellipses').length).toBe(2);
        expect(listEl.children().length).toBe(7);
      });
    });
  });

  describe('with compact prop enabled', () => {
    it('should render compact variant', () => {
      const wrapper = render({ currentPage: 2, compact: true });
      const compactClassName = 'ds-c-pagination__page-count';

      expect(wrapper.find(compactClassName)).toBeTruthy();
      expect(wrapper.contains('ol')).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render non-interactive text nodes in place of pagination slot links', () => {
      const wrapper = render({ currentPage: 2, compact: true });
      const pages = wrapper.childAt(1);

      expect(pages.type()).toEqual('span');
      expect(pages.contains('a')).toBe(false);
    });
  });
});
