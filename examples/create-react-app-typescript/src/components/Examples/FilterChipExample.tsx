import React, { useState } from 'react';
import { FilterChip } from '@cmsgov/ds-healthcare-gov';

function FilterChipExample() {
  const [showFilterChip, setShowFilterChip] = useState(true);

  return (
    <div>
      <h2>FilterChip Example</h2>
      {showFilterChip && (
        <FilterChip
          label="Dismiss me"
          ariaClearLabel="Clear"
          onDelete={() => {
            setShowFilterChip(false);
          }}
        />
      )}
    </div>
  );
}

export default FilterChipExample;
