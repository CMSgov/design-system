import { useState } from 'react';
import { FilterChip } from '@cmsgov/design-system';

function FilterChipExample() {
  const [showFilterChip, setShowFilterChip] = useState(true);

  return (
    <>
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
    </>
  );
}

export default FilterChipExample;
