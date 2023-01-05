import React from 'react';
import format from 'date-fns/format';

export interface PublishDateProps {
  date: string;
}

/**
 * Renders a date for blog articles
 */
const PublishDate = ({ date }: PublishDateProps) => (
  <time dateTime={date} className="ds-text-body--sm ds-u-color--gray">
    {format(new Date(date), 'PPP')}
  </time>
);

export default PublishDate;
