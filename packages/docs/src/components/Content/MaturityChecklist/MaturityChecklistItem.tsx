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
  return (
    <li className="c-maturity-checklist-item">
      <h4>{title}</h4>
      <div>{children}</div>
      <div className="c-maturity-checklist-item__status">{status}</div>
    </li>
  );
};

export default MaturityChecklistItem;
