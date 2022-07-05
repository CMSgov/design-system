// Polyfills required for IE11 compatibility
// Features used by app or its dependencies (i.e. @popperjs/core in Tooltip)
import 'core-js/stable/object/assign';
import 'core-js/stable/array/find';
import 'core-js/features/promise';
// TODO: Update react-transition-group once we update react peer dep
import CSSTransition from 'react-transition-group/CSSTransition';
import FocusTrap from 'focus-trap-react';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { createPopper, Placement } from '@popperjs/core';
import uniqueId from 'lodash/uniqueId';
import { Button } from '../Button';
import { CloseIconThin } from '../Icons';
import usePrevious from '../utilities/usePrevious';

export interface TooltipProps {
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
   */
  interactiveBorder?: number;
  inversed?: boolean;
  /**
   * Applies `skidding` and `distance` offsets to the tooltip relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/modifiers/popper-offsets/) for more info.
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
   */
  placement?: Placement;
  /**
   * `maxWidth` styling applied to the tooltip body
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
   * Duration of the `react-transition-group` CSSTransition. See the [`timeout` option](http://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout) for more info.
   */
  transitionDuration?: number;
  /**
   * `zIndex` styling applied to the tooltip body
   */
  zIndex?: number;
}

export const Tooltip = (props: TooltipProps) => {
  const popper = useRef(null);
  const id = useRef(props.id ?? uniqueId('trigger_'));
  const triggerElement = useRef(null);
  const tooltipElement = useRef(null);

  const setTriggerElement = (elem) => {
    triggerElement.current = elem;
  };
  const setTooltipElement = (elem) => {
    tooltipElement.current = elem;
  };

  const [active, setActive] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const prevActiveStateVar = usePrevious(active);

  const handleEscapeKey = (event: KeyboardEvent) => {
    const ESCAPE_KEY = 27;
    if (active && event.keyCode === ESCAPE_KEY) {
      setActive(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (active && (props.dialog || isMobile)) {
      const clickedTrigger = triggerElement.current?.contains(event.target);
      const clickedTooltip = tooltipElement.current?.contains(event.target);
      if (!clickedTooltip && !clickedTrigger) {
        setActive(false);
      }
    }
  };

  const handleCloseButtonClick = () => {
    if (active && (props.dialog || isMobile)) {
      setActive(false);
    }
  };

  const handleBlur = (event: MouseEvent) => {
    setTimeout(() => {
      const focusedInsideTrigger = triggerElement.current?.contains(event.target);
      const focusedInsideTooltip = tooltipElement.current?.contains(event.target);
      if (!focusedInsideTrigger && !focusedInsideTooltip && !isHover) {
        setActive(false);
      }
    }, 10);
  };

  const handleTouch = () => {
    // On mobile, touch -> mouseenter -> click events can all be fired simultaneously
    // `isMobile` flag is used inside onClick and onMouseEnter handlers, so touch events can be used in isolation on mobile
    // https://stackoverflow.com/a/65055198
    setIsMobile(true);
    setActive(!active);
  };

  useEffect(() => {
    if (!triggerElement.current || !tooltipElement.current) return;

    popper.current = createPopper(triggerElement.current, tooltipElement.current, {
      placement: props.placement,
      modifiers: [{ name: 'offset', options: { offset: props.offset } }],
    });

    return () => {
      if (popper.current) popper.current.destroy();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  useEffect(() => {
    if (active) {
      props.onOpen && props.onOpen();
    } else {
      props.onClose && props.onClose();

      // if tooltip goes from active to inactive and is the dialog version, focus the trigger
      if (prevActiveStateVar && (props.dialog || isMobile) && props.showCloseButton) {
        if (triggerElement && triggerElement.current) {
          triggerElement.current.focus();
        }
      }
    }
  }, [active]);

  useLayoutEffect(() => {
    if (popper.current) {
      popper.current.setOptions(props);
      popper.current.forceUpdate();
    }
  });

  const renderTrigger = (props: TooltipProps): React.ReactElement => {
    const {
      activeClassName,
      ariaLabel,
      children,
      className,
      component,
      dialog,
      offset,
      onClose,
      onOpen,
      inversed,
      interactiveBorder,
      placement,
      maxWidth,
      title,
      transitionDuration,
      zIndex,
      showCloseButton,
      closeButtonLabel,
      contentHeading,
      ...others
    } = props;

    const TriggerComponent = component;
    const triggerClasses = classNames('ds-base', 'ds-c-tooltip__trigger', className, {
      [activeClassName]: active,
      'ds-c-tooltip__trigger--inverse': inversed,
    });
    const linkTriggerOverrides = {
      tabIndex: TriggerComponent === 'a' ? 0 : undefined,
    };
    const eventHandlers = dialog
      ? {
          onTouchStart: () => handleTouch(),
          onClick: () => {
            if (!isMobile) {
              setActive(!active);
            }
          },
        }
      : {
          onTouchStart: () => handleTouch(),
          onClick: () => {
            if (!isMobile) {
              setActive(!active);
            }
          },
          onFocus: () => setActive(true),
          onBlur: (event) => handleBlur(event),
        };

    return (
      <TriggerComponent
        type={TriggerComponent === 'button' ? 'button' : undefined}
        aria-label={ariaLabel || undefined}
        aria-describedby={dialog ? undefined : id.current}
        className={triggerClasses}
        ref={setTriggerElement}
        {...others}
        {...linkTriggerOverrides}
        {...eventHandlers}
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
      interactiveBorder,
      placement,
      maxWidth,
      showCloseButton,
      title,
      transitionDuration,
      zIndex,
    } = props;

    const tooltipStyle = { maxWidth, zIndex };
    const interactiveBorderStyle: React.CSSProperties = {
      left: `-${interactiveBorder}px`,
      top: `-${interactiveBorder}px`,
      border: `${interactiveBorder}px solid transparent`,
      zIndex: -999, // ensures interactive border doesnt cover tooltip content
    };
    const eventHandlers = dialog ? {} : { onBlur: (event) => handleBlur(event) };

    const tooltipContent = (
      <div
        id={id.current}
        tabIndex={dialog ? -1 : null}
        ref={setTooltipElement}
        className={classNames('ds-c-tooltip', { 'ds-c-tooltip--inverse': inversed })}
        style={tooltipStyle}
        data-placement={placement}
        aria-hidden={!active}
        role={dialog ? 'dialog' : 'tooltip'}
        {...eventHandlers}
      >
        <span className="ds-c-tooltip__arrow" data-popper-arrow />
        <div className="ds-c-tooltip__content ds-base">
          {contentHeading || showCloseButton ? (
            <div
              className={classNames('ds-c-tooltip__header', {
                'ds-c-tooltip__header--right': !contentHeading,
              })}
            >
              {contentHeading}
              {showCloseButton && (
                <Button
                  variation="link"
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

    return (
      <CSSTransition in={active} classNames="ds-c-tooltip" timeout={transitionDuration}>
        {dialog ? (
          <FocusTrap
            active={active}
            focusTrapOptions={{
              initialFocus: () => document.getElementById(`${id.current}`),
              clickOutsideDeactivates: true,
            }}
          >
            {tooltipContent}
          </FocusTrap>
        ) : (
          tooltipContent
        )}
      </CSSTransition>
    );
  };

  const mainEventHandlers = props.dialog
    ? {}
    : {
        onMouseEnter: () => {
          if (!isMobile) {
            setIsHover(true);
            setActive(true);
          }
        },
        onMouseLeave: () => {
          if (!isMobile) {
            setIsHover(false);
            setActive(false);
          }
        },
      };

  return (
    <div className="ds-c-tooltip__container" {...mainEventHandlers}>
      {renderTrigger(props)}
      {renderContent(props)}
    </div>
  );
};

Tooltip.defaultProps = {
  component: 'button',
  interactiveBorder: 15,
  maxWidth: '300px',
  offset: [0, 5],
  placement: 'top',
  transitionDuration: 250, // Equivalent to $animation-speed-1
  zIndex: 9999,
};

export default Tooltip;
