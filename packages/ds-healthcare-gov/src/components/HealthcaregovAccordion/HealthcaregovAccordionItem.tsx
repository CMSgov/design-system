import { AccordionItem, MinusCircleIcon, PlusCircleIcon } from '@cmsgov/design-system';
import { AccordionItemProps } from '@cmsgov/design-system/dist/react-components/types/Accordion/AccordionItem.js';

const HealthcaregovAccordionItem = function (props: AccordionItemProps) {
  const { closeIconComponent = MinusCircleIcon, openIconComponent = PlusCircleIcon } = props;

  return (
    <AccordionItem
      closeIconComponent={closeIconComponent}
      openIconComponent={openIconComponent}
      {...props}
    />
  );
};

export { HealthcaregovAccordionItem };
