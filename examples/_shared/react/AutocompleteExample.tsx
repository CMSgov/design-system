import { Autocomplete, TextField, AutocompleteItems } from '@cmsgov/design-system';
import { useMemo, useState } from 'react';

const BASE_ITEMS = [
  { id: '1', name: 'Cook County, IL' },
  { id: '2', name: 'Cook County, MD' },
  { id: '3', name: 'Cook County, TN' },
  { id: '4', name: 'Boulder County, CO' },
  { id: '5', name: 'Broward County, FL' },
];

function AutocompleteExample() {
  const [input, setInput] = useState('');

  const filteredItems: AutocompleteItems | undefined = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return undefined;
    const results = BASE_ITEMS.filter(
      (item: any) => !item.name || item.name.toLowerCase().includes(query)
    );
    return results.length ? results : [];
  }, [input]);

  const onInputValueChange = (val: string) => {
    setInput(val);
  };

  return (
    <>
      <h2>Autocomplete</h2>
      <Autocomplete
        items={filteredItems}
        loading={false}
        loadingMessage="Loading..."
        noResultsMessage="No results"
        clearSearchButton
        ariaClearLabel="Clear search"
        onChange={(item) => console.log('[onChange]', item)}
        onInputValueChange={onInputValueChange}
      >
        <TextField
          label="Counties"
          name="the-autocomplete"
          hint="Type, arrow to an option, then press Tab to blur."
          value={input}
        />
      </Autocomplete>
    </>
  );
}

export default AutocompleteExample;
