import type * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import {
  arrow,
  autoUpdate,
  useFloating,
  flip,
  limitShift,
  offset as floatingOffset,
  Placement,
  shift,
  useTransitionStyles,
  FloatingFocusManager,
  useHover,
  useInteractions,
  useRole,
  useFocus,
  useClick,
  useDismiss,
} from '@floating-ui/react';
import useId from '../utilities/useId';
import { Button } from '../Button';
import { CloseIconThin } from '../Icons';
import { AnalyticsOverrideProps, AnalyticsParentDataProps } from '../analytics';
import useTooltipAnalytics from './useTooltipAnalytics';
import mergeRefs from '../utilities/mergeRefs';

export interface BaseTooltipProps
  extends Omit<AnalyticsOverrideProps, 'analyticsEventTypeOverride'>,
    AnalyticsParentDataProps {
  /**
   * Classes applied to the tooltip trigger when the tooltip is active
   */
  activeClassName?: string;
  /**
   * Helpful description of the tooltip for screenreaders
   */
  ariaLabel?: string;
  /**
   * Tooltip trigger content
   */
  children: React.ReactNode;
  /**
   * Classes applied to the tooltip trigger
   */
  className?: string;
  /**
   * Configurable text for the aria-label of the tooltip's close button
   */
  closeButtonLabel?: string;
  /**
   * When provided, will render the passed in component for the tooltip trigger. Typically will be a `button`, `a`, or rarely an `input` element.
   * Default is `'button'`
   */
  component?: React.ReactElement<any> | any | ((...args: any[]) => any);
  /**
   * Heading for the tooltip content. This will show above 'title' content and inline with 'closeButton' if closeButton is set
   */
  contentHeading?: React.ReactNode;

  /**
   * Tooltip that behaves like a dialog, i.e. a tooltip that only appears on click, traps focus, and contains interactive content. For more information, see Deque's [tooltip dialog documentation](https://dequeuniversity.com/library/aria/tooltip-dialog)
   */
  dialog?: boolean;
  /**
   * `id` applied to tooltip body container element. If not provided, a unique id will be automatically generated and used.
   */
  id?: string;
  /**
   * Sets the size of the invisible border around interactive tooltips that prevents it from immediately hiding when the cursor leaves the tooltip.
   * Default is `15`
   */
  interactiveBorder?: number;
  inversed?: boolean;
  /**
   * Applies `skidding` and `distance` offsets to the tooltip relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/modifiers/popper-offsets/) for more info.
   * Default is `[0, 5]`
   */
  offset?: [number, number];
  /**
   * Called when the tooltip is hidden
   */
  onClose?: () => any;
  /**
   * Called when the tooltip is shown
   */
  onOpen?: () => any;
  /**
   * Placement of the tooltip body relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/constructors/#options) for more info.
   * Default is `'top'`
   */
  placement?: Placement;
  /**
   * `maxWidth` styling applied to the tooltip body
   * Default is `'300px'`
   */
  maxWidth?: string;
  /**
   * Determines if close button is shown in tooltip. It is recommended that the close button is only used if `dialog=true`
   */
  showCloseButton?: boolean;
  /**
   * Content inside the tooltip body or popover. If contains interactive elements use the `dialog` prop.
   */
  title: React.ReactNode;
  /**
   * Duration of the CSS transition.
   * Default is `250`
   */
  transitionDuration?: number;
  /**
   * Helpful description of the tooltip for screenreaders. An alias for `ariaLabel` specifically added to improve accessibility for the web component version of this component.
   */
  triggerAriaLabel?: string;
  /**
   * `zIndex` styling applied to the tooltip body
   * Default is `9999`
   */
  zIndex?: number;
}

// Similarly to the Button component, we want to expand the props type definition to
// permit pass-through props for the most commonly used underlying components.
// However, unlike in Button, we have not removed the ability for applications to
// define a custom `component` prop, which means there are theoretically props
// specific to that component type which will not be available in the TooltipProps
// definition. The strategy here is to keep the types simple by including just the
// possible attributes of button and anchor, but it comes at the expense of accuracy.
// If applications have extra props for their custom components, they will need to
// tell TypeScript to ignore those props for now. We'd like to revisit Tooltip in
// the future and improve it.
type OtherProps = Omit<
  // All other props that could be passed to buttons or anchors
  React.ComponentPropsWithRef<'button'> & React.ComponentPropsWithRef<'a'>,
  // Omit any properties that we're defining on our own `BaseTooltipProps`
  keyof BaseTooltipProps
>;

export type TooltipProps = BaseTooltipProps & OtherProps;

export const placements: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
] as const;

/**
 * Tooltips provide additional information upon hover, focus or click.
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/tooltip/).
 *
 * When using the `<TooltipIcon>` as the only child of `<Tooltip>`, be sure to
 * provide an `aria-label` on the `<Tooltip>` to ensure an accessible name for
 * the trigger.
 */

export const Tooltip = (props: TooltipProps) => {
  const {
    dialog,
    onClose,
    onOpen,
    placement = 'top',
    offset = [0, 5],
    transitionDuration = 250,
  } = props;
  const contentId = useId('tooltip-trigger--', props.id);
  const arrowElement = useRef(null);
  const { contentRef, sendTooltipEvent } = useTooltipAnalytics(props);

  const setArrowElement = (elem) => {
    arrowElement.current = elem;
  };

  const [active, setActive] = useState<boolean>(false);

  const {
    context,
    floatingStyles,
    middlewareData,
    placement: finalPlacement,
    refs,
  } = useFloating<HTMLButtonElement>({
    onOpenChange: setActive,
    open: active,
    placement: placement,
    middleware: [
      floatingOffset({ crossAxis: offset[0], mainAxis: offset[1] }),
      flip(),
      shift({ limiter: limitShift() }),
      arrow({ element: arrowElement.current }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context, { enabled: dialog });
  const dismiss = useDismiss(context, { enabled: dialog });
  const focus = useFocus(context, { enabled: !dialog });
  const hover = useHover(context, { enabled: !dialog });
  const role = useRole(context, { role: dialog ? 'dialog' : 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    focus,
    hover,
    role,
  ]);
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: transitionDuration,
  });

  const side = finalPlacement.split('-')[0];
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[side];

  const handleCloseButtonClick = () => {
    if (active && props.dialog) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      onOpen && onOpen();
      sendTooltipEvent();
    } else {
      onClose && onClose();
    }
  }, [active, onClose, onOpen, sendTooltipEvent]);

  const renderTrigger = (props: TooltipProps): React.ReactElement => {
    const {
      activeClassName,
      analytics,
      analyticsLabelOverride,
      onAnalyticsEvent,
      ariaLabel,
      children,
      className,
      component = 'button',
      dialog,
      id,
      offset,
      onClose,
      onOpen,
      inversed,
      interactiveBorder,
      placement,
      maxWidth,
      title,
      transitionDuration,
      triggerAriaLabel,
      zIndex,
      showCloseButton,
      closeButtonLabel,
      contentHeading,
      ...others
    } = props;

    const TriggerComponent = component;
    const triggerClasses = classNames('ds-c-tooltip__trigger', className, {
      [activeClassName]: activeClassName && active,
      'ds-c-tooltip__trigger--inverse': inversed,
    });
    const linkTriggerOverrides = {
      tabIndex: TriggerComponent === 'a' ? 0 : undefined,
    };
    return (
      <TriggerComponent
        type={TriggerComponent === 'button' ? 'button' : undefined}
        aria-label={ariaLabel || triggerAriaLabel || undefined}
        aria-describedby={dialog ? undefined : contentId}
        className={triggerClasses}
        ref={mergeRefs([contentRef, refs.setReference])}
        {...others}
        {...linkTriggerOverrides}
        {...getReferenceProps()}
      >
        {children}
      </TriggerComponent>
    );
  };

  const renderContent = (props: TooltipProps): React.ReactElement => {
    const {
      closeButtonLabel,
      dialog,
      contentHeading,
      inversed,
      interactiveBorder = 15,
      maxWidth = '300px',
      showCloseButton,
      title,
      zIndex = 9999,
    } = props;

    const tooltipStyle = { maxWidth, zIndex };
    const interactiveBorderStyle: React.CSSProperties = {
      left: `-${interactiveBorder}px`,
      top: `-${interactiveBorder}px`,
      border: `${interactiveBorder}px solid transparent`,
      zIndex: -999, // ensures interactive border doesnt cover tooltip content
    };

    const tooltipContent = (
      <div
        id={contentId}
        tabIndex={dialog ? -1 : null}
        ref={refs.setFloating}
        className={classNames('ds-c-tooltip', { 'ds-c-tooltip--inverse': inversed })}
        style={{ ...tooltipStyle, ...floatingStyles, ...styles }}
        data-placement={finalPlacement}
        aria-hidden={!active}
        {...getFloatingProps()}
      >
        <span
          className="ds-c-tooltip__arrow"
          ref={setArrowElement}
          style={{
            left: middlewareData.arrow?.x,
            top: middlewareData.arrow?.y,
            [staticSide]: '-5px',
          }}
        />
        <div className="ds-c-tooltip__content">
          {contentHeading || showCloseButton ? (
            <div
              className={classNames('ds-c-tooltip__header', {
                'ds-c-tooltip__header--right': !contentHeading,
              })}
            >
              {contentHeading}
              {showCloseButton && (
                <Button
                  variation="ghost"
                  size="small"
                  className="ds-c-tooltip__close-button"
                  onClick={handleCloseButtonClick}
                  aria-label={closeButtonLabel || 'Close'}
                >
                  <CloseIconThin />
                </Button>
              )}
            </div>
          ) : null}
          {title}
        </div>
        {!dialog && (
          <span className="ds-c-tooltip__interactive-border" style={interactiveBorderStyle} />
        )}
      </div>
    );

    return isMounted && tooltipContent;
  };

  return (
    <div className="ds-c-tooltip__container">
      {renderTrigger(props)}
      {dialog ? (
        <FloatingFocusManager context={context} initialFocus={refs.floating} guards={false}>
          {renderContent(props)}
        </FloatingFocusManager>
      ) : (
        renderContent(props)
      )}
    </div>
  );
};

export default Tooltip;
