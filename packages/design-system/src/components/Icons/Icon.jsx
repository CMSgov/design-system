import React from 'react';
import url from '../../images/icons.svg';

export const Icon = ({ icon }) => {
  // alternative way to get icons.svg url
  // const url = new URL('../../images/icons.svg', import.meta.url);

  return (
    <svg height="1em" width="1em">
      <use href={`${url}#${icon}`}></use>
    </svg>
  );
};
