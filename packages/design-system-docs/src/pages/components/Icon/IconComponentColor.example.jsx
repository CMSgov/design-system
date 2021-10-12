import { CloseIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const colorData = [
  {
    color: 'Primary',
    cssClass: 'ds-c-icon-color--primary',
  },
  {
    color: 'Inverse',
    cssClass: 'ds-c-icon-color--inverse',
    isInverse: true,
  },
  {
    color: 'Error',
    cssClass: 'ds-c-icon-color--error',
  },
  {
    color: 'Warn',
    cssClass: 'ds-c-icon-color--warn',
  },
  {
    color: 'Success',
    cssClass: 'ds-c-icon-color--success',
  },
];

ReactDOM.render(
  <>
    <table className="ds-c-table">
      <thead>
        <tr>
          <th>Color</th>
          <th>CSS Utility Class</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {colorData.map(({ color, cssClass, isInverse }) => (
          <tr key={color}>
            <td>{color}</td>
            <td>
              <code>{cssClass}</code>
            </td>
            <td
              className="ds-u-text-align--center"
              style={isInverse ? { backgroundColor: 'black' } : {}}
            >
              <CloseIcon className={cssClass} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
