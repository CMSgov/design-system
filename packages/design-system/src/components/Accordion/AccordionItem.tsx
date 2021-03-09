// import { Button } from '../Button/Button';
import classnames from 'classnames';
import React, { useState } from 'react';

export interface AccordionItemData {
  title: string;
  content: string | JSX.Element;
  id: string;
  expanded?: boolean;
  accordionContentClassNames?: string;
}

export interface AccordionItemProps extends Omit<AccordionItemData, 'id'> {
  onHeadingClick?: (expanded: boolean) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  expanded,
  onHeadingClick,
  accordionContentClassNames,
}) => {
  const [open, setOpen] = useState(!!expanded);
  const onClick = () => {
    setOpen(!open);
    if (onHeadingClick) {
      onHeadingClick(!open);
    }
  };

  return (
    <>
      <h2 className="ds-c-accordion__heading">
        <button
          className="ds-c-accordion__button"
          onClick={onClick}
          style={{ backgroundImage: `url(${open ? '/images/remove.svg' : '/images/add.svg'})` }}
        >
          {title}
        </button>
      </h2>
      {open && (
        <div
          className={classnames('ds-c-accordion__content', {
            [`${accordionContentClassNames}`]: accordionContentClassNames,
          })}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default AccordionItem;
