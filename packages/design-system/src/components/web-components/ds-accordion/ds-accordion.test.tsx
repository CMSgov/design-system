import { render } from '@testing-library/react';
import './ds-accordion';
import './ds-accordion-item';

function renderAccordion(attrs = {}) {
  return render(
    <ds-accordion {...attrs}>
      <ds-accordion-item heading="First amendment">
        <p>We the People of the United States, in Order to form a more perfect Union...</p>
      </ds-accordion-item>
      <ds-accordion-item heading="Second amendment">
        <p>A well regulated Militia, being necessary to the security of a free State...</p>
      </ds-accordion-item>
    </ds-accordion>
  );
}

describe('ds-accordion', () => {
  it('renders a accordion item', () => {
    const { asFragment } = renderAccordion();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders additional className', () => {
    const { container } = renderAccordion({ 'class-name': 'ds-u-test' });
    const accordion = container.querySelector('.ds-c-accordion');
    expect(accordion.classList).toContain('ds-u-test');
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const { container } = renderAccordion({ bordered: 'true' });
    const accordion = container.querySelector('.ds-c-accordion');
    expect(accordion.classList).toContain('ds-c-accordion--bordered');
  });
});
