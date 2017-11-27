/* eslint-disable react/display-name */
import MonthPicker from './MonthPicker';
import React from 'react';

export default function() {
  return (
    <div>
      <MonthPicker
        name="months"
        selectAllText="Select all"
        clearAllText="Clear all"
      />
      <MonthPicker
        name="months-2"
        selectAllText="Select all"
        clearAllText="Clear all"
        defaultSelectedMonths={[
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true
        ]}
      />
    </div>
  );
}
