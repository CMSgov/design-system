import { IdleTimeout } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const timeToWarning = 0.5;

ReactDOM.render(
  <div style={{ minHeight: 300 }}>
    <p>Idle Timeout modal will show after {timeToWarning} minutes of inactivity.</p>
    <IdleTimeout
      onTimeout={() => console.log('timeout ended')}
      timeToTimeout={30}
      timeToWarning={timeToWarning}
    />
  </div>,
  document.getElementById('js-example')
);
