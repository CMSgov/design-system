import { AccordionItem, MinusCircleIcon, PlusCircleIcon } from '@cmsgov/design-system';

AccordionItem.defaultProps = {
  ...AccordionItem.defaultProps,
  closeIconComponent: MinusCircleIcon,
  openIconComponent: PlusCircleIcon,
};

export default AccordionItem;
