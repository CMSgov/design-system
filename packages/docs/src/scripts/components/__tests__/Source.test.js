import React from 'react';
import Source from '../Source';
import githubUrl from '../../shared/githubUrl';
import { shallow } from 'enzyme';

describe('Source', () => {
  let props;
  const blobPath = githubUrl('/blob/master');

  beforeEach(() => {
    props = {
      source: {
        filename: 'components/Button/Button.scss',
        path: 'packages/core/src/components/Button/Button.scss'
      }
    };
  });

  it('links to SCSS file', () => {
    const wrapper = shallow(<Source {...props} />);

    expect(wrapper.prop('href')).toBe(`${blobPath}/${props.source.path}`);
  });

  it('links to JSX file', () => {
    props.reactComponentPath =
      'core/src/components/ButtonGroup/ButtonGroup.jsx';

    const wrapper = shallow(<Source {...props} />);

    expect(wrapper.prop('href')).toBe(
      `${blobPath}/packages/${props.reactComponentPath}`
    );
  });

  it('adds class name', () => {
    const wrapper = shallow(<Source {...props} className="foo" />);

    expect(wrapper.hasClass('foo')).toBe(true);
  });
});
