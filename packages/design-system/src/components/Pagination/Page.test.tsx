import Page from './Page';
import React from 'react';
import { shallow } from 'enzyme';

describe('Page', () => {
    const onPageChange = jest.fn();

    it('should render interactive el if not current', () => {
        const wrapper = shallow(<Page index={1} isActive={false} onPageChange={onPageChange} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render static el if not current', () => {
        const wrapper = shallow(<Page index={1} isActive onPageChange={onPageChange} />);
        expect(wrapper).toMatchSnapshot();
    });
});
