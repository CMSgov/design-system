// Example files in the docs directory can use the @src alias to import from the design system source directory
import NewBadge from '@src/components/NewBadge/NewBadge';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <NewBadge>Default badge</NewBadge>
    <NewBadge variation="info">Basdariation` prop</NewBadge>
    <NewBadge size="big">Badge with `size` prop</NewBadge>
  </>,
  document.getElementById('js-example')
);
