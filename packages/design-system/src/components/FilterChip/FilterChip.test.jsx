import FilterChip from './FilterChip';
import React from 'react';
import { shallow } from 'enzyme';

describe('FilterChip', () => {
  it('should include children as label', () => {
    expect(shallow(<FilterChip label="Foo" />).text()).toEqual('Foo<ClearIcon />');
  });

  it('renders button and should call onDelete function when clicked', () => {
    const onDelete = jest.fn();
    const wrapper = shallow(<FilterChip label="Foo" onDelete={onDelete} />);
    expect(wrapper.text()).toEqual('Foo<ClearIcon />');

    const button = wrapper.find('button');
    expect(button.length).toEqual(1);

    button.simulate('click');
    wrapper.update();
    expect(onDelete).toHaveBeenCalled();
  });
});
