import React from 'react';
import ReactDOM from 'react-dom';
import { UsaBanner } from '@cmsgov/design-system';

ReactDOM.render(
  <div>
    <h6 className="preview__label">.gov Domains</h6>
    <UsaBanner />
    <h6 className="preview__label">.gov Domains (Spanish)</h6>
    <UsaBanner locale="es-US" />
  </div>,
  document.getElementById('js-example')
);
