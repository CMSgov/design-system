import React, { FunctionComponent, useState } from 'react';

interface AccordionItemProps {
  heading: string;
  expanded?: boolean;
  id: string;
}

const AccordionItem: FunctionComponent<{
  heading;
  expanded;
  onHeadingClick;
  children;
}> = ({ children, heading, expanded, onHeadingClick }) => {
  // Set the state for opening and closing an accordion item
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
          {heading}
        </button>
      </h2>
      {open && <div className="ds-c-accordion__content">{children}</div>}
    </>
  );
};

export default AccordionItem;
