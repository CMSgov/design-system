/* eslint-disable react/self-closing-comp */
import {
  AddIcon,
  AlertCircleIcon,
  ArrowsStackedIcon,
  ArrowIcon,
  BuildingCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  CloseIconThin,
  DownloadIcon,
  ImageIcon,
  InfoCircleIcon,
  InfoCircleIconThin,
  LockCircleIcon,
  LockIcon,
  NextIcon,
  PdfIcon,
  RemoveIcon,
  StarIcon,
  UsaFlagIcon,
  WarningIcon,
} from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

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
        <tr>
          <td>
            <code>AddIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <AddIcon />
          </td>
          <td>Add</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>AlertCircleIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <AlertCircleIcon />
          </td>
          <td>Alert</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>ArrowsStackedIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <ArrowsStackedIcon />
          </td>
          <td>Sort</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>ArrowIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <ArrowIcon />
            <ArrowIcon direction="down" />
            <ArrowIcon direction="left" />
            <ArrowIcon direction="right" />
          </td>
          <td>[direction of arrow]</td>
          <td>
            Component takes <code>direction</code> prop to determine if it is up, down, left or
            right.
          </td>
        </tr>
        <tr>
          <td>
            <code>BuildingCircleIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <BuildingCircleIcon />
          </td>
          <td>Building in circle</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>CheckCircleIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <CheckCircleIcon />
          </td>
          <td>Checkmark in circle</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>CheckIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <CheckIcon />
          </td>
          <td>Checkmark</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>CloseIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIcon />
          </td>
          <td>Close</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>CloseIconThin</code>
          </td>
          <td className="ds-u-text-align--center">
            <CloseIconThin />
          </td>
          <td>Close</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>DownloadIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <DownloadIcon />
          </td>
          <td>Download</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>ImageIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <ImageIcon />
          </td>
          <td>Image</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>InfoCircleIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <InfoCircleIcon />
          </td>
          <td>Information</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>InfoCircleIconThin</code>
          </td>
          <td className="ds-u-text-align--center">
            <InfoCircleIconThin />
          </td>
          <td>Information</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>LockCircleIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <LockCircleIcon />
          </td>
          <td>Lock in circle</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>LockIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <LockIcon />
          </td>
          <td>Lock</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>NextIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <NextIcon />
          </td>
          <td>Next</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>PdfIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <PdfIcon />
          </td>
          <td>Pdf</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>RemoveIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <RemoveIcon />
          </td>
          <td>Remove</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>StarIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <StarIcon />
            <StarIcon isFilled />
          </td>
          <td>Star / Star Filled</td>
          <td>
            Component takes <code>isFilled</code> prop to determine star is filled or an outline.
          </td>
        </tr>
        <tr>
          <td>
            <code>UsaFlagIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <UsaFlagIcon />
          </td>
          <td>U.S. flag</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>WarningIcon</code>
          </td>
          <td className="ds-u-text-align--center">
            <WarningIcon />
          </td>
          <td>Warning</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </>,
  document.getElementById('js-example')
);
