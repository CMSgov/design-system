import type * as React from 'react';
import { Fragment } from 'react';

interface HumanizeListOptions {
  conjunction?: string;
  oxfordComma?: boolean;
}

/**
 * Humanizes a list of React nodes by joining them with a conjunction. Originally from
 * https://github.com/chadly/humanize-react/, but the package is no longer maintained.
 */
export function humanizeList(list: React.ReactNode[], options: HumanizeListOptions = {}) {
  if (!Array.isArray(list)) {
    throw new TypeError('humanizeReactList expected an array');
  }

  const { conjunction = 'and', oxfordComma = true } = options;

  const listLength = list.length;
  if (listLength === 1) {
    return list[0];
  }

  const humanizedList = [];
  for (let i = 0; i < listLength; i++) {
    if (i === listLength - 1) {
      if (listLength > 2 && oxfordComma) {
        humanizedList.push(<Fragment key={`${i}-comma`}>,</Fragment>);
      }

      humanizedList.push(<Fragment key={`${i}-conjunction`}> {conjunction} </Fragment>);
    } else if (i !== 0) {
      humanizedList.push(<Fragment key={`${i}-comma`}>, </Fragment>);
    }

    humanizedList.push(<Fragment key={i}>{list[i]}</Fragment>);
  }

  return <>{humanizedList}</>;
}
