import { CloseIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

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
        <tr>
          <td>Small</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--sm" />
          </td>
        </tr>
        <tr>
          <td>Default</td>
          <td className="ds-u-text-align--center">
            <CloseIcon />
          </td>
        </tr>
        <tr>
          <td>Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--lg" />
          </td>
        </tr>
        <tr>
          <td>Extra Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--xl" />
          </td>
        </tr>
        <tr>
          <td>2x Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--2xl" />
          </td>
        </tr>
        <tr>
          <td>3x Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--3xl" />
          </td>
        </tr>
        <tr>
          <td>4x Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--4xl" />
          </td>
        </tr>
        <tr>
          <td>5x Large</td>
          <td className="ds-u-text-align--center">
            <CloseIcon className="ds-u-font-size--5xl" />
          </td>
        </tr>
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
