import { Badge } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const clearIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    className="ds-c-clear-icon"
  >
    <path
      className="ds-c-clear-icon__x"
      d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M160,113.9l96,96l96-96l46.1,46.1
		l-96,96l96,96L352,398.1l-96-96l-96,96L113.9,352l96-96l-96-96L160,113.9z"
    />
  </svg>
);

ReactDOM.render(
  <>
    <Badge>Default badge</Badge>
    <Badge variation="info">Badge with `variation` prop</Badge>
    <Badge size="big">Badge with `size` prop</Badge>
    <div className="ds-u-margin-top--3">
      <Badge dismissible>Badge with `dismissible` prop</Badge>
      <Badge dismissible variation="warn">
        Badge with `dismissible` prop and `warn` variation
      </Badge>
      <Badge dismissible variation="alert">
        Badge with `dismissible` prop and `alert` variation
      </Badge>
    </div>
    <div className="ds-u-margin-top--3">
      <Badge dismissible clearIcon={clearIcon}>
        Dismissible badge with custom icon
      </Badge>
      <Badge dismissible variation="warn" clearIcon={clearIcon}>
        Dismissible warning badge with custom icon
      </Badge>
      <Badge dismissible variation="alert" clearIcon={clearIcon}>
        Dismissible alert badge with custom icon
      </Badge>
    </div>
  </>,
  document.getElementById('js-example')
);
