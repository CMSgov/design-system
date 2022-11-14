import LogoEsSvg from './LogoEsSvg';
import { render } from '@testing-library/react';

describe('LogoEsSvg', function () {
  it('renders Spanish SVG logo', () => {
    const { container } = render(<LogoEsSvg />);
    expect(container).toMatchSnapshot();
  });
});
