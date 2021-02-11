import { Badge } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <Badge>Default badge</Badge>
    <Badge variation="info">Badge with `variation` prop</Badge>
    <Badge size="big">Badge with `size` prop</Badge>
  </>,
  document.getElementById('js-example')
);
