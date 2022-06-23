import React from 'react';
import { AccordionItem, MinusCircleIcon, PlusCircleIcon } from '@cmsgov/design-system';
import { getLanguage, tWithLanguage } from '../i18n';

const locale = getLanguage();
const t = tWithLanguage(locale);

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
