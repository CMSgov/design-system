import React from 'react';
import ReactDOM from 'react-dom';
import { Review } from '@design-system';

const editButtonHref = '#!';
ReactDOM.render(
  <div>
    <div>
      <Review heading="A single Review component" editHref={editButtonHref}>
        This is an example of a single React Review component.
      </Review>
    </div>
    <div>
      <Review
        className="ds-u-padding-top--6"
        heading="Multiple Review components"
        editHref={editButtonHref}
      >
        Multiple Review components can be combined together one after another.
      </Review>
      <Review
        heading="A Review component with custom edit content"
        editContent={
          <div>
            <a href={editButtonHref}>Edit</a>
            <span>|</span>
            <a href={editButtonHref}>Remove</a>
          </div>
        }
      >
        The edit link can be replaced to customize the component.
      </Review>
      <Review heading="Full Name" editHref={editButtonHref}>
        John Doe
      </Review>
      <Review heading="Date of Birth" editHref={editButtonHref}>
        October 11, 1980
      </Review>
      <Review
        heading="Shopping List"
        editHref={editButtonHref}
        editAriaLabel="Edit this shopping list"
      >
        <ul>
          <li>Milk</li>
          <li>Eggs</li>
          <li>Flour</li>
          <li>Sugar</li>
        </ul>
      </Review>
      <Review editHref={editButtonHref}>The heading is not required.</Review>
    </div>
  </div>,
  document.getElementById('js-example')
);
