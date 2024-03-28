import React from 'react';
import classNames from 'classnames';
import { autoPlacement, useFloating, offset, autoUpdate, shift } from '@floating-ui/react-dom';
import useId from '../utilities/useId';
import { Button } from '../Button';
import { CloseButton } from '../CloseButton';

// export interface BaseTooltipProps {
//   block?: boolean;
//   children: React.ReactNode;
//   label: string;
//   id?: string;
//   // placement?: Placement;
// }

// // Similarly to the Button component, we want to expand the props type definition to
// // permit pass-through props for the most commonly used underlying components.
// type OtherProps = Omit<
//   // All other props that could be passed to buttons
//   React.ComponentPropsWithRef<'button'>,
//   // Omit any properties that we're defining on our own `BaseTooltipProps`
//   keyof BaseTooltipProps
// >;

// export type TooltipProps = BaseTooltipProps & OtherProps;

/**
 * Tooltips provide additional information upon hover, focus or click.
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/tooltip/).
 *
 * When using the `<TooltipIcon>` as the only child of `<Tooltip>`, be sure to
 * provide an `aria-label` on the `<Tooltip>` to ensure an accessible name for
 * the trigger.
 */
export const Tooltip = (props) => {
  const tooltipId = useId('tooltip-trigger--', props.id);

  const { refs, floatingStyles } = useFloating({
    middleware: [
      autoPlacement({ allowedPlacements: ['top', 'bottom'] }),
      offset(props.offset),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const tooltipContent = (
    // `popover` shouldn't need to specify `auto` as its value as that's its default,
    // however the codebase gives it a value of `true` otherwise. Need to explicitly
    // set it to `auto` to allow for light dismiss capabilities.
    <div
      role="tooltip"
      id={tooltipId}
      className="ds-c-tooltip"
      popover="auto"
      ref={refs.setFloating}
      style={floatingStyles}
    >
      <button
        className="ds-c-tooltip__close-button"
        popovertarget={tooltipId}
        popovertargetaction="hide"
      >
        X
      </button>
      <div className="ds-c-tooltip__content">{props.children}</div>
    </div>
  );

  return (
    <>
      {props.block ? (
        <>
          {/* `popovertarget` is the original implementation and will be deprecated in favor 
        of `invoketarget`. `popovertarget` has wider browser support. */}
          <button className="tooltip-trigger" popovertarget={tooltipId} ref={refs.setReference}>
            {props.label}
          </button>

          {tooltipContent}
        </>
      ) : (
        <>
          <span>
            <span id="tooltip-trigger__label" className="tooltip-trigger__label--inline">
              {props.label}
            </span>
            &thinsp;
            {/* inline button style needs work */}
            <button
              className="tooltip-trigger tooltip-trigger--inline"
              popovertarget={tooltipId}
              aria-labelledby="tooltip-trigger__label"
              ref={refs.setReference}
            >
              🌭
            </button>
          </span>

          {tooltipContent}
        </>
      )}
    </>
  );
};

Tooltip.defaultProps = {
  offset: 10,
};

export default Tooltip;
