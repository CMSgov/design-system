import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import figma from '@figma/code-connect';

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=22112-25734',
  {
    props: {
      defaultOpen: figma.enum('Open', {
        Yes: true,
        No: false,
      }),
      labelProps: figma.nestedProps('.accordion-label', { heading: figma.string('Label') }),
      contentProps: figma.nestedProps('.accordion-content', { content: figma.string('Content') }),
    },
    example: ({ defaultOpen, labelProps, contentProps }) => (
      <Accordion>
        <AccordionItem heading={labelProps.heading} defaultOpen={defaultOpen}>
          {contentProps.content}
        </AccordionItem>
      </Accordion>
    ),
  }
);
