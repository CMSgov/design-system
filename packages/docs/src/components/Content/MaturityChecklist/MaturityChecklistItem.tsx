import React from 'react';

export type CheckStatus = boolean | null;

interface MaturityChecklistItemProps {
  status: CheckStatus;
  title: string;
  children: React.ReactNode;
}

/**
 *
 */
const MaturityChecklistItem = ({ status, title, children }: MaturityChecklistItemProps) => {
  let check;
  if (status === true) {
    check = '[x]';
  } else if (status === null) {
    check = 'N/A';
  } else {
    check = '[ ]';
  }

  return (
    <li className="c-maturity-checklist-item">
      <div className="c-maturity-checklist-item__description">
        <h4 className="c-maturity-checklist-item__title">{title}</h4>
        <div>{children}</div>
      </div>
      <div className="c-maturity-checklist-item__status">{check}</div>
    </li>
  );
};

export default MaturityChecklistItem;
