import { AccordionItem, MinusCircleIcon, PlusCircleIcon } from '@cmsgov/design-system';
import { t } from '../i18n';

AccordionItem.defaultProps = {
  ...AccordionItem.defaultProps,
  closeIcon: (
    <MinusCircleIcon
      className="ds-c-accordion__button-icon"
      title={t('accordion.close')}
      ariaHidden={false}
    />
  ),
  openIcon: (
    <PlusCircleIcon
      className="ds-c-accordion__button-icon"
      title={t('accordion.open')}
      ariaHidden={false}
    />
  ),
};

export default AccordionItem;
