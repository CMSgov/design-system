import React from 'react';
import Source from '../Source';
import githubUrl from '../../helpers/githubUrl';
import { shallow } from 'enzyme';

describe('Source', () => {
  let props;
  const blobPath = githubUrl('blob/master');

  beforeEach(() => {
    props = {
      reactComponentPath: 'design-system/src/components/Button/Button.scss',
    };
  });

  it('links to JSX file', () => {
    props.reactComponentPath = 'design-system/src/components/ButtonGroup/ButtonGroup.jsx';

    const wrapper = shallow(<Source {...props} />);

    expect(wrapper.prop('href')).toBe(`${blobPath}/packages/${props.reactComponentPath}`);
  });

  it('adds class name', () => {
    const wrapper = shallow(<Source {...props} className="foo" />);

    expect(wrapper.hasClass('foo')).toBe(true);
  });
});
