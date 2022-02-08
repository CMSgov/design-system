import { IdleTimeout } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{ minHeight: 300 }}>
    <IdleTimeout
      onTimeout={() => console.log('timeout ended')}
      timeToTimeout={30}
      timeToWarning={30}
    />
  </div>,
  document.getElementById('js-example')
);
