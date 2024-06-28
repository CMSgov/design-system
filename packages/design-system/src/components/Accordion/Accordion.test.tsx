import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import { render } from '@testing-library/react';

const children = [
  <AccordionItem key="1" heading="First amendment" id="1">
    <p>Hello world!</p>
  </AccordionItem>,
  <AccordionItem key="2" heading="Second amendment" id="2">
    <p>Hello world!</p>
  </AccordionItem>,
];

function renderAccordion(customProps = {}) {
  const props = { ...customProps };

  return render(<Accordion {...props}>{children}</Accordion>);
}

describe('Accordion', function () {
  it('renders accordion', () => {
    const { container, asFragment } = renderAccordion();
    const accordion = container.firstChild as HTMLElement;

    expect(accordion.classList).toContain('ds-c-accordion');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders additional className', () => {
    const { container } = renderAccordion({ className: 'ds-u-test' });
    const accordion = container.firstChild as HTMLElement;

    expect(accordion.classList).toContain('ds-u-test');
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const { container } = renderAccordion({ bordered: true });
    const accordion = container.firstChild as HTMLElement;

    expect(accordion.classList).toContain('ds-c-accordion--bordered');
  });
});
