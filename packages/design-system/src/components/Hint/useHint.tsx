import type * as React from 'react';
import { Hint } from './Hint';

export interface UseHintProps {
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * The ID of the hint element
   */
  hintId?: string;
  /**
   * A unique `id` for the field element
   */
  id: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Custom CSS class name(s) for the hint element
   */
  hintClassName?: string;
}

/**
 * Hook that takes the props for a form field component, extracts the props relevant
 * to the Hint, and conditionally renders the hint if it is needed.
 */
export function useHint<T extends UseHintProps>(props: T) {
  const { hint, inversed, requirementLabel, hintClassName } = props;

  let hintElement;
  let hintId;
  if (hint || requirementLabel) {
    hintId = props.hintId ?? `${props.id}__hint`;
    hintElement = (
      <Hint
        requirementLabel={requirementLabel}
        inversed={inversed}
        id={hintId}
        className={hintClassName}
      >
        {hint}
      </Hint>
    );
  }

  return {
    hintId,
    hintElement,
  };
}
