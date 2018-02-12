import React from 'react';
import ReactDOM from 'react-dom';
import Review from './Review';

ReactDOM.render(
  <div>
    <Review heading="A single Review component" editHref="javascript:void(0);">
      This is an example of a single React Review component.
    </Review>
    <Review
      className="ds-u-padding-top--6"
      heading="Multiple Review components"
      editHref="javascript:void(0);"
    >
      Multiple Review components can be combined together one after another.
    </Review>
    <Review heading="Full Name" editHref="javascript:void(0);">
      John Doe
    </Review>
    <Review heading="Date of Birth" editHref="javascript:void(0);">
      October 11, 1980
    </Review>
    <Review heading="Shopping List" editHref="javascript:void(0);">
      <ul>
        <li>Milk</li>
        <li>Eggs</li>
        <li>Flour</li>
        <li>Sugar</li>
      </ul>
    </Review>
    <Review editHref="javascript:void(0);">The heading is not required.</Review>
  </div>,
  document.getElementById('js-example')
);
