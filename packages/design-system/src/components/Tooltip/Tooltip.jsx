import CSSTransition from 'react-transition-group/CSSTransition';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { createPopper } from '@popperjs/core';

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.parentElement = null;
    this.triggerElement = null;
    this.tooltipElement = null;

    this.setParentElement = (element) => {
      this.parentElement = element;
    };
    this.setTriggerElement = (element) => {
      this.triggerElement = element;
    };
    this.setTooltipElement = (element) => {
      this.tooltipElement = element;
    };

    this.state = { active: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    this.popper = createPopper(this.triggerElement, this.tooltipElement, {
      placement: this.props.placement,
      modifiers: [
        {
          name: 'offset',
          options: { offset: this.props.offset },
        },
      ],
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
    this.popper.destroy();
  }

  handleClickOutside(event) {
    // Closes click only tooltips when mouse clicks outside of tooltip container element
    if (this.state.active && this.props.disableFocusListener && this.props.disableHoverListener) {
      if (this.parentElement && !this.parentElement.contains(event.target)) {
        this.setTooltipActive(false);
      }
    }
  }

  handleEscapeKey(e) {
    // Closes interactive and click only tooltips when ESC key is pressed
    const ESCAPE_KEY = 27;
    if (this.state.active && e.keyCode === ESCAPE_KEY) {
      if (
        this.props.interactive ||
        (this.props.disableFocusListener && this.props.disableHoverListener)
      ) {
        this.setTooltipActive(false);
      }
    }
  }

  setTooltipActive(active) {
    this.setState({ active }, () => {
      this.popper.forceUpdate();
    });
  }

  handleTriggerBlur() {
    // Hide tooltips when blurring away from the trigger
    // Except when blurring from trigger to interactive tooltip
    if (this.props.interactive) {
      setTimeout(() => {
        if (!this.parentElement.contains(document.activeElement)) {
          this.setTooltipActive(false);
        }
      }, 20);
    } else {
      this.setTooltipActive(false);
    }
  }

  triggerComponentType() {
    let component = this.props.triggerComponent;
    if (component === 'button' && this.props.triggerHref) {
      // If `href` is provided and a custom component is not, we render `<a>` instead
      component = 'a';
    }
    return component;
  }

  renderTrigger() {
    const {
      ariaLabel,
      disableTouchListener,
      disableHoverListener,
      disableFocusListener,
      disableClickListener,
      triggerActiveClassName,
      triggerClassName,
      triggerContent,
      triggerHref,
      triggerId,
    } = this.props;

    const TriggerComponent = this.triggerComponentType();
    const triggerClasses = classNames('ds-c-tooltip__trigger', 'ds-base', triggerClassName, {
      [triggerActiveClassName]: this.state.active,
    });

    return (
      <TriggerComponent
        id={triggerId}
        type={TriggerComponent === 'button' ? 'button' : undefined}
        onTouchStart={() =>
          disableTouchListener ? null : this.setTooltipActive(!this.state.active)
        }
        onFocus={() => (disableFocusListener ? null : this.setTooltipActive(true))}
        onBlur={() => (disableFocusListener ? null : this.handleTriggerBlur())}
        onMouseEnter={() => (disableHoverListener ? null : this.setTooltipActive(true))}
        onMouseLeave={() => (disableHoverListener ? null : this.setTooltipActive(false))}
        onClick={() => (disableClickListener ? null : this.setTooltipActive(!this.state.active))}
        aria-label={ariaLabel || ''}
        aria-describedby={`tooltip-${triggerId}`}
        className={triggerClasses}
        ref={this.setTriggerElement}
        href={triggerHref}
      >
        {triggerContent}
      </TriggerComponent>
    );
  }

  renderContent() {
    const {
      children,
      disableHoverListener,
      disableFocusListener,
      inverse,
      interactive,
      interactiveBorder,
      placement,
      className,
      maxWidth,
      zIndex,
      transitionDuration,
      triggerId,
    } = this.props;

    const tooltipStyle = { maxWidth, zIndex };
    const interactiveBorderStyle = {
      left: `-${interactiveBorder}px`,
      top: `-${interactiveBorder}px`,
      border: `${interactiveBorder}px solid transparent`,
      zIndex: '-999', // ensures interactive border doesnt cover tooltip content
    };

    const tooltipContent = () => (
      <>
        <div className="ds-c-tooltip__arrow" data-popper-arrow />
        <div className="ds-c-tooltip__content ds-base">{children}</div>
      </>
    );

    return (
      <CSSTransition in={this.state.active} classNames="ds-c-tooltip" timeout={transitionDuration}>
        <div
          id={`tooltip-${triggerId}`}
          tabIndex="-1"
          ref={this.setTooltipElement}
          className={classNames(
            'ds-c-tooltip',
            {
              'ds-c-tooltip--inverse': inverse,
            },
            className
          )}
          style={tooltipStyle}
          onMouseEnter={() => (interactive ? this.setTooltipActive(true) : null)}
          onMouseLeave={() =>
            disableHoverListener && disableFocusListener ? null : this.setTooltipActive(false)
          }
          data-placement={placement}
          aria-labelledby={triggerId}
          aria-hidden={!this.state.active}
          role={interactive ? 'dialog' : 'tooltip'}
        >
          {interactive ? (
            // Child of focus trap must be a single node and valid HTML element, no <Fragment>
            // For click only tooltips, set initialFocus to the tooltip container element
            // For non click only tooltips, set initialFocus to the trigger element
            // to ensure focus is not automatically set to the tooltip when the trigger is focused
            <FocusTrap
              active={this.state.active}
              focusTrapOptions={{
                clickOutsideDeactivates: true,
                initialFocus:
                  disableHoverListener && disableFocusListener
                    ? `#tooltip-${triggerId}`
                    : `#${triggerId}`,
              }}
            >
              <div>
                {tooltipContent()}
                <div className="ds-c-tooltip__interactive-border" style={interactiveBorderStyle} />
              </div>
            </FocusTrap>
          ) : (
            tooltipContent()
          )}
        </div>
      </CSSTransition>
    );
  }

  render() {
    return (
      <div ref={this.setParentElement}>
        {this.renderTrigger()}
        {this.renderContent()}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  interactiveBorder: 15,
  placement: 'top',
  maxWidth: '300px',
  zIndex: '9999',
  offset: [0, 5],
  triggerComponent: 'button',
  transitionDuration: 250, // Equivalent to $animation-speed-1
};
Tooltip.propTypes = {
  /**
   * Helpful description of the tooltip for screenreaders
   */
  ariaLabel: PropTypes.string,
  /**
   * Content inside the tooltip body or popover. If this contains interactive elements set the `interactive` prop.
   */
  children: PropTypes.node.isRequired,
  /**
   * Classes applied to the tooltip body
   */
  className: PropTypes.string,
  /**
   * Disables tooltip activation and deactivation on touch events
   */
  disableTouchListener: PropTypes.bool,
  /**
   * Disables tooltip activation and deactivation on hover events
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Disables tooltip activation and deactivation on focus and blur events
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Disables tooltip activation and deactivation on mouse click events
   */
  disableClickListener: PropTypes.bool,
  /**
   * Should be set to `true` if tooltip content includes tabbable elements like links or buttons. Interactive tooltips trap focus, expands the activation area to include the tooltip itself, and includes other accessibility changes.
   */
  interactive: PropTypes.bool,
  /**
   * Sets the size of the invisible border around the tooltip that prevents it from immediately hiding when the cursor leaves the toolip.
   */
  interactiveBorder: PropTypes.number,
  inverse: PropTypes.bool,
  /**
   * Applies `skidding` and `distance` offsets to the tooltip relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/modifiers/popper-offsets/) for more info.
   */
  offset: PropTypes.arrayOf(PropTypes.number),
  /**
   * Placement of the tooltip body relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/constructors/#options) for more info.
   */
  placement: PropTypes.oneOf(['auto', 'bottom', 'top', 'right', 'left']),
  /**
   * `maxWidth` styling applied to the tooltip body
   */
  maxWidth: PropTypes.string,
  /**
   * Duration of the `react-transition-group` CSSTransition. See the [`timeout` option](http://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout) for more info.
   */
  transitionDuration: PropTypes.number,
  /**
   * `id` applied to the trigger element, used in `aria-labelledby`
   */
  triggerId: PropTypes.string.isRequired,
  /**
   * When provided, this will render the passed in component for the tooltip trigger. Typically this will be a `button`, `a`, or rarely an `input` element.
   */
  triggerComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  /**
   * Trigger element content, typically an icon or text.
   */
  triggerContent: PropTypes.node.isRequired,
  /**
   * `href` attribute applied to link trigger elements.
   */
  triggerHref: PropTypes.string,
  /**
   * Classes applied to the tooltip trigger
   */
  triggerClassName: PropTypes.string,
  /**
   * Classes applied to the tooltip trigger when the tooltip is activated
   */
  triggerActiveClassName: PropTypes.string,
  /**
   * `zIndex` styling applied to the tooltip body
   */
  zIndex: PropTypes.string,
};

export default Tooltip;
