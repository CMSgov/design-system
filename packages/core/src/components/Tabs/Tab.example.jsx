import React from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';

ReactDOM.render(
  <div className="ds-c-tabs" role="tablist">
    <Tab id="tab-example-1" panelId="tab-example-panel-1" selected>
      Selected tab
    </Tab>
    <Tab id="tab-example-2" panelId="tab-example-panel-2">
      Other tab
    </Tab>
  </div>,
  document.getElementById('js-example')
);
