/* eslint-disable react/no-danger */
import { RoundedStarIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const iconData = [
  {
    defaultTitle: '[variation] Star',
    component: (
      <>
        <RoundedStarIcon />
        <RoundedStarIcon variation="half" />
        <RoundedStarIcon variation="filled" />
      </>
    ),
    name: 'RoundedStarIcon',
    notes:
      'Takes a `variation` prop to determine if the star is fully filled, half filled, or just an outline.',
  },
];

ReactDOM.render(
  <>
    <table className="ds-c-table">
      <thead>
        <tr>
          <th>Icon Component</th>
          <th>Example</th>
          <th>
            Default <code>title</code> attribute
          </th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {iconData.map(({ defaultTitle, component, name, notes }) => (
          <tr key={name}>
            <td>
              <code>{name}</code>
            </td>
            <td className="ds-u-text-align--center">{component}</td>
            <td>{defaultTitle}</td>
            <td dangerouslySetInnerHTML={{ __html: notes }} />
          </tr>
        ))}
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
