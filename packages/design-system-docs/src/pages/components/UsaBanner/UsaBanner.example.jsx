import React from 'react';
import ReactDOM from 'react-dom';
import { UsaBanner } from '@cmsgov/design-system';

ReactDOM.render(
  <div>
    <h6 className="preview__label">English banner</h6>
    <UsaBanner />
    <h6 className="preview__label">Spanish banner</h6>
    <UsaBanner locale="es" />
  </div>,
  document.getElementById('js-example')
);
