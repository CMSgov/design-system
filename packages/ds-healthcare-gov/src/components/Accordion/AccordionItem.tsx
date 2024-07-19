import { AccordionItem, MinusCircleIcon, PlusCircleIcon } from '@cmsgov/design-system';

AccordionItem.defaultProps = {
  ...AccordionItem.defaultProps,
  closeIconComponent: MinusCircleIcon,
  openIconComponent: PlusCircleIcon,
};

// We need this for the healthcare story to work, and we also need to declare the side
// effects for the src path.
export { AccordionItem };
