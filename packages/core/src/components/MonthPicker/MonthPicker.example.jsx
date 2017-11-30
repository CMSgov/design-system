/* eslint-disable react/display-name */
import MonthPicker from './MonthPicker';
import React from 'react';

export default function() {
  return (
    <div>
      <MonthPicker
        name="months"
        label="Select the months you were eligible for employer coverage in 2017"
        hint={
          <span>
            This is a long-form explanation of what we mean by employer
            coverage, and at the end of this sentence is a link to{' '}
            <a href="#more-info" className="ds-u-color--inherit">
              find out more about employer coverage
            </a>.
          </span>
        }
        selectAllText="Select all"
        clearAllText="Clear all"
      />
      <MonthPicker
        name="months-2"
        label="Select the months you were in cryosleep during 2046"
        selectAllText="Select all"
        clearAllText="Clear all"
        disabledMonths={[7, 8, 9, 10, 11, 12]}
      />
    </div>
  );
}
