import Pagination from './Pagination';
import React from 'react';
import { shallow } from 'enzyme';

describe('Pagination', () => {
  const pageButtonSelector = '.ds-c-button';
  
  it('should render component', () => {
    const wrapper = shallow(<Pagination totalPages={3} currentPage={2} />);
    expect(wrapper.is('nav')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  describe('accessibility attributes', () => {
    it('should hav correct role', () => {
      const wrapper = shallow(<Pagination totalPages={8} />);
      expect(wrapper.prop('role')).toEqual('navigation');
    });
    it('should have navigation label', () => {
      const wrapper = shallow(<Pagination totalPages={8} />);
      expect(wrapper.prop('aria-label')).toEqual('Pagination Navigation');
    });
  });

  xit('should add custom className if specified', () => {
  });

  xdescribe('interactivity', () => {
      it('should change url when "previous" is pressed', () => {});

      it('should change url when "next" is pressed', () => {});

      it('should change url when page pressed', () => {});

      it('should change custom url when provided', () => {});

      it('should call onPageChange, if provided', () => {});
  });

  describe('navigation slot behavior', () => {
    it('should show "previous" navigation slot if current page is not first page of set', () => {
      const wrapper = shallow(<Pagination totalPages={3} currentPage={2} />);
      const firstChild = wrapper.childAt(0);
      expect(firstChild.type()).toEqual('a');
      expect(firstChild.text()).toEqual('Previous');
    });

    it('should hide "previous" navigation slot if current page is first page of set', () => {
      const wrapper = shallow(<Pagination totalPages={3} currentPage={1} />);
      expect(wrapper.childAt(0).type()).toEqual('ol');
    });

    it('should show "next" navigation slot if current page is not last page of set', () => {
      const wrapper = shallow(<Pagination totalPages={3} currentPage={2} />);
      const lastChild = wrapper.children().last();
      expect(lastChild.type()).toEqual('a');
      expect(lastChild.text()).toEqual('Next');
    });

    it('should hide "next" navigation slot if current page is last page of set', () => {
      const wrapper = shallow(<Pagination totalPages={3} currentPage={3} />);
      const lastChild = wrapper.children().last();
      expect(lastChild.type()).toEqual('ol');
    });

    xit('should render icon specified', () => {});
  });
  
  describe('pagination slot behavior', () => {
    it('should begin page count with 1', () => {
      const wrapper = shallow(<Pagination totalPages={3} currentPage={1} />);
      const firstPage = wrapper.find('ol').childAt(0).dive().find(pageButtonSelector);

      expect(firstPage).toBeDefined();
      expect(firstPage.text()).toBe('1');
    });

    it('should end page count with page total', () => {
      const lastPageNum = 3;
      const wrapper = shallow(<Pagination totalPages={lastPageNum} currentPage={1} />);
      const lastPage = wrapper.find('ol').childAt(2).dive().find(pageButtonSelector);

      expect(lastPage).toBeDefined();
      expect(lastPage.text()).toBe(`${lastPageNum}`);
    });

    it('should highlight current page with correct styles', () => {
      const wrapper = shallow(<Pagination totalPages={5} currentPage={3} />);
      const currentPageEl = wrapper.find('ol').childAt(2).dive().find(pageButtonSelector);

      expect(currentPageEl.type()).toEqual('span');
      expect(currentPageEl.prop('aria-label')).toEqual('current page, page 3');
      expect(currentPageEl.prop('aria-current')).toEqual('true');
      expect(currentPageEl.hasClass('ds-c-pagination__current-page')).toBeTruthy();
    });

    xit('should not allow current page to be interactive', () => {
      const wrapper = shallow(<Pagination totalPages={5} currentPage={3} />);
      const currentPageEl = wrapper.find('ol').childAt(2).dive().find(pageButtonSelector);

      currentPageEl.simulate('click', { });
      // expect nothing to change
    });
    
    describe('less than 7 pages', () => {
      it('should show all pages', () => {
        const totalPageNum = 5;
        const wrapper = shallow(<Pagination totalPages={totalPageNum} currentPage={1} />);
        const listEl = wrapper.find('ol');
        const pageItems = listEl.children();
  
        expect(pageItems.length).toEqual(totalPageNum);
        expect(listEl).toMatchSnapshot();
      });

      it('should never show ellipsis', () => {
        const wrapper = shallow(<Pagination totalPages={6} />);

        expect(wrapper.find('Ellipses').length).toBe(0);
      })
    });

    describe('more than 7 pages', () => {
      it('should not show beginning ellipsis for pages 1 - 3', () => {
        const wrapper1 = shallow(<Pagination totalPages={35} currentPage={1} />);
        const wrapper2 = shallow(<Pagination totalPages={35} currentPage={2} />);
        const wrapper3 = shallow(<Pagination totalPages={35} currentPage={3} />);

        expect(wrapper1.find('Ellipses').length).toBe(1);
        let secondSlot = wrapper1.find('ol').childAt(1).dive().find(pageButtonSelector);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');

        expect(wrapper2.find('Ellipses').length).toBe(1);
        secondSlot = wrapper2.find('ol').childAt(1).dive().find(pageButtonSelector);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');

        expect(wrapper3.find('Ellipses').length).toBe(1);
        secondSlot = wrapper3.find('ol').childAt(1).dive().find(pageButtonSelector);
        expect(secondSlot).toBeDefined();
        expect(secondSlot.text()).toBe('2');
      });

      it('should not show end ellipsis for last 3 pages', () => {
        const wrapperLast = shallow(<Pagination totalPages={35} currentPage={35} />);
        const wrapperSecondLast = shallow(<Pagination totalPages={35} currentPage={34} />);
        const wrapperThirdLast = shallow(<Pagination totalPages={35} currentPage={33} />);

        expect(wrapperLast.find('Ellipses').length).toBe(1);
        let secondLastSlot = wrapperLast.find('ol').childAt(5).dive().find(pageButtonSelector);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');

        expect(wrapperSecondLast.find('Ellipses').length).toBe(1);
        secondLastSlot = wrapperSecondLast.find('ol').childAt(5).dive().find(pageButtonSelector);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');

        expect(wrapperThirdLast.find('Ellipses').length).toBe(1);
        secondLastSlot = wrapperThirdLast.find('ol').childAt(5).dive().find(pageButtonSelector);
        expect(secondLastSlot).toBeDefined();
        expect(secondLastSlot.text()).toBe('34');
      });

      it('should show both ellipsis for number in middle', () => {
        const wrapperEndMiddle = shallow(<Pagination totalPages={35} currentPage={10} />);
        const wrapperBeginningMiddle = shallow(<Pagination totalPages={35} currentPage={30} />);

        expect(wrapperEndMiddle.find('Ellipses').length).toBe(2);
        expect(wrapperBeginningMiddle.find('Ellipses').length).toBe(2);
      });
    })
  });

  xdescribe('with compact prop enabled', () => {
    it('should render compact variant', () => {});
    it('should render non-interactive text nodes in place of pagination slot links', () => {});
  });
});
