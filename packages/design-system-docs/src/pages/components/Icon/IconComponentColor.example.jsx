import { CloseIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

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
        <tr>
          <td>Primary</td>
          <td>
            <code>ds-c-icon--primary</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-c-icon--primary" />
          </td>
        </tr>
        <tr>
          <td>Inverse</td>
          <td>
            <code>ds-c-icon--inverse</code>
          </td>
          <td style={{ backgroundColor: 'black' }} className="ds-u-text-align--center">
            <CloseIcon className="ds-c-icon--inverse" />
          </td>
        </tr>
        <tr>
          <td>Error</td>
          <td>
            <code>ds-c-icon--error</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-c-icon--error" />
          </td>
        </tr>
        <tr>
          <td>Warn</td>
          <td>
            <code>ds-c-icon--warn</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-c-icon--warn" />
          </td>
        </tr>
        <tr>
          <td>Success</td>
          <td>
            <code>ds-c-icon--primary</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-c-icon--success" />
          </td>
        </tr>
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
