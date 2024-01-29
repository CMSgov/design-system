import React from 'react';
import Status from './Status';
import classNames from 'classnames';

export type CheckStatus = boolean | null;

interface MaturityChecklistItemProps {
  status: CheckStatus;
  title: string;
  children: React.ReactNode;
}

/**
 *
 */
const MaturityChecklistItem = ({ status, title, children }: MaturityChecklistItemProps) => (
  <li
    className={classNames(
      'c-maturity-checklist__item',
      status === null && 'ds-u-color--gray-light'
    )}
  >
    <div className="c-maturity-checklist-item__status">
      <Status status={status} />
    </div>
    <p className="c-maturity-checklist-item__description">
      <strong>{title}:&nbsp;</strong>
      {children}
    </p>
  </li>
);

export default MaturityChecklistItem;
