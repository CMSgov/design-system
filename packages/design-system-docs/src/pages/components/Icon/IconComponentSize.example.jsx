import { CloseIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const sizeData = [
  {
    sizeName: 'Small',
    cssClass: 'ds-u-font-size--sm',
  },
  {
    sizeName: 'Default',
    cssClass: '',
  },
  {
    sizeName: 'Large',
    cssClass: 'ds-u-font-size--lg',
  },
  {
    sizeName: 'Extra Large',
    cssClass: 'ds-u-font-size--xl',
  },
  {
    sizeName: '2x Large',
    cssClass: 'ds-u-font-size--2xl',
  },
  {
    sizeName: '3x Large',
    cssClass: 'ds-u-font-size--3xl',
  },
  {
    sizeName: '4x Large',
    cssClass: 'ds-u-font-size--4xl',
  },
  {
    sizeName: '5x Large',
    cssClass: 'ds-u-font-size--5xl',
  },
];

ReactDOM.render(
  <>
    <table className="ds-c-table">
      <thead>
        <tr>
          <th>Size</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {sizeData.map(({ sizeName, cssClass }) => (
          <tr key={sizeName}>
            <td>{sizeName}</td>
            <td className="ds-u-text-align--center">
              <CloseIcon className={cssClass} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
