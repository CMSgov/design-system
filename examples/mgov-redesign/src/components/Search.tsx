import { Autocomplete, TextField as DsTextField } from '@cmsgov/design-system';
import type { AutocompleteItem } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import { Button } from './Button';
import '../styles/components/Search.css';

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

interface SearchProps {
  /** Accessible name for the field. Shown above the field when `showLabel`, otherwise screen-reader only. */
  label?: string;
  /** Render the label visibly. Search fields usually have no visible label, so this defaults to false. */
  showLabel?: boolean;
  hint?: string;
  placeholder?: string;
  /** `name` attribute on the input; also the key read from the form on submit. */
  name?: string;
  defaultValue?: string;
  /** When set, renders a trailing submit button with this label. Omit for the no-button variant. */
  buttonLabel?: string;
  /** Suggestions. When provided, the field becomes an Autocomplete; omit for a basic TextField. */
  items?: AutocompleteItem[];
  onSubmit?: (value: string) => void;
}

/**
 * Medicare.gov redesign Search.
 *
 * A composition (not a single DS component): a `<form role="search">` wrapping
 * a search field — a DS `TextField`, optionally wrapped in a DS `Autocomplete`
 * — plus an optional trailing submit `Button`. Two independent props drive the
 * supported variations:
 *   - `buttonLabel`  → with / without the trailing button
 *   - `items`        → with autocomplete / basic TextField
 *
 * The submitted value is read from the form via `FormData`, so the field stays
 * uncontrolled and the same submit path works for both field types. All styling
 * lives in `styles/components/Search.css`, scoped to `.ds-c-mgov-search`.
 */
export function Search({
  label = 'Search',
  showLabel = false,
  hint,
  placeholder = 'Search',
  name = 'search',
  defaultValue,
  buttonLabel,
  items,
  onSubmit,
}: SearchProps) {
  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.(String(data.get(name) ?? ''));
  };

  // DS TextField passed directly (not the mgov wrapper) so Autocomplete reliably
  // detects it as its child TextField.
  const textField = (
    <DsTextField
      name={name}
      label={label}
      labelClassName={showLabel ? undefined : 'ds-u-visibility--screen-reader'}
      hint={hint}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );

  return (
    <form className="ds-c-mgov-search" role="search" onSubmit={handleSubmit}>
      <div className="ds-c-mgov-search__row">
        <div className="ds-c-mgov-search__field">
          {items ? (
            <Autocomplete items={items} label={label} clearSearchButton={false}>
              {textField}
            </Autocomplete>
          ) : (
            textField
          )}
        </div>
        {buttonLabel && (
          <Button type="submit" variation="solid" size="big" className="ds-c-mgov-search__button">
            {buttonLabel}
          </Button>
        )}
      </div>
    </form>
  );
}
