import { ChoiceList as DsChoiceList } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/ChoiceBlock.css';

type ChoiceBlockProps = ComponentProps<typeof DsChoiceList>;

/**
 * Medicare.gov redesign Choice Block.
 *
 * Thin wrapper over the CMS Design System `ChoiceList` that adds the
 * `ds-c-mgov-choice` namespace class (lands on the <fieldset>). All redesign
 * styling lives in `styles/components/ChoiceBlock.css`, scoped to that class,
 * so the base DS ChoiceList is untouched.
 *
 * Each choice is presented as a bordered "card": a 1px-bordered rounded box
 * that gets a 2px green border when selected. Works for `type="radio"` and
 * `type="checkbox"`; each `choices` item may include a `hint`.
 */
export function ChoiceBlock({ className, ...props }: ChoiceBlockProps) {
  return (
    <DsChoiceList
      {...props}
      className={['ds-c-mgov-choice', className].filter(Boolean).join(' ')}
    />
  );
}
