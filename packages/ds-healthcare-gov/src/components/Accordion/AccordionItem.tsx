import {
  AccordionItem as DSAccordionItem,
  MinusCircleIcon,
  PlusCircleIcon,
} from '@cmsgov/design-system';
import { AccordionItemProps } from '@cmsgov/design-system/dist/react-components/types/Accordion/AccordionItem.js';

const AccordionItem = function (props: AccordionItemProps) {
  const { closeIconComponent = MinusCircleIcon, openIconComponent = PlusCircleIcon } = props;

  return (
    <DSAccordionItem
      closeIconComponent={closeIconComponent}
      openIconComponent={openIconComponent}
      {...props}
    />
  );
};

// We need this for the healthcare story to work, and we also need to declare the side
// effects for the src path.
export { AccordionItem };
