// Polyfills required for IE11 compatibility
// Features used by this app or its dependencies (i.e. @popperjs/core in Tooltip)
import 'core-js/stable/object/assign';
import 'core-js/stable/array/find';
import 'core-js/features/promise';
// TODO: Update react-transition-group once we update react peer dep
import CSSTransition from 'react-transition-group/CSSTransition';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { createPopper } from '@popperjs/core';
import uniqueId from 'lodash.uniqueid';

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.id || uniqueId('trigger_');
    this.triggerElement = null;
    this.tooltipElement = null;
    this.setTriggerElement = (elem) => {
      this.triggerElement = elem;
    };
    this.setTooltipElement = (elem) => {
      this.tooltipElement = elem;
    };

    this.state = {
      active: false,
      isHover: false,
      isMobile: false,
    };
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
    // Closes dialog and mobile tooltips when mouse clicks outside of tooltip element
    if (this.state.active && (this.props.dialog || this.state.isMobile)) {
      const clickedTrigger = this.triggerElement && this.triggerElement.contains(event.target);
      const clickedTooltip = this.tooltipElement && this.tooltipElement.contains(event.target);
      if (!clickedTooltip && !clickedTrigger) {
        this.setTooltipActive(false);
      }
    }
  }

  handleEscapeKey(e) {
    // Closes tooltips when ESC key is pressed
    const ESCAPE_KEY = 27;
    if (this.state.active && e.keyCode === ESCAPE_KEY) {
      this.setTooltipActive(false);
    }
  }

  setTooltipActive(active) {
    if (active !== this.state.active) {
      this.setState({ active }, () => {
        this.popper.forceUpdate();
        if (active) {
          this.props.onOpen && this.props.onOpen();
        } else {
          this.props.onClose && this.props.onClose();
        }
      });
    }
  }

  handleBlur() {
    // Hide tooltips when blurring away from the trigger or tooltip body
    // and when the mouse is not hovering over the tooltip
    setTimeout(() => {
      const focusedInsideTrigger =
        this.triggerElement && this.triggerElement.contains(document.activeElement);
      const focusedInsideTooltip =
        this.tooltipElement && this.tooltipElement.contains(document.activeElement);
      if (!focusedInsideTrigger && !focusedInsideTooltip && !this.state.isHover) {
        this.setTooltipActive(false);
      }
    }, 10);
  }

  handleTouch() {
    // On mobile, touch -> mouseenter -> click events can all be fired simultaneously
    // `isMobile` flag is used inside onClick and onMouseEnter handlers, so touch events can be used in isolation on mobile
    // https://stackoverflow.com/a/65055198
    this.setState({ isMobile: true });
    this.setTooltipActive(!this.state.active);
  }

  renderTrigger() {
    const {
      activeClassName,
      ariaLabel,
      children,
      className,
      component,
      dialog,
      offset,
      id,
      onClose,
      onOpen,
      inversed,
      interactiveBorder,
      placement,
      maxWidth,
      title,
      transitionDuration,
      zIndex,
      ...others
    } = this.props;

    const TriggerComponent = component;
    const triggerClasses = classNames('ds-base', 'ds-c-tooltip__trigger', className, {
      [activeClassName]: this.state.active,
      'ds-c-tooltip__trigger--inverse': inversed,
    });
    const linkTriggerOverrides = {
      role: TriggerComponent === 'a' ? 'button' : undefined,
      tabIndex: TriggerComponent === 'a' ? 0 : undefined,
    };
    const eventHandlers = dialog
      ? {
          onTouchStart: () => this.handleTouch(),
          onClick: () => {
            if (!this.state.isMobile) {
              this.setTooltipActive(!this.state.active);
            }
          },
        }
      : {
          onTouchStart: () => this.handleTouch(),
          onClick: () => {
            if (!this.state.isMobile) {
              this.setTooltipActive(!this.state.active);
            }
          },
          onFocus: () => this.setTooltipActive(true),
          onBlur: () => this.handleBlur(),
        };

    return (
      <TriggerComponent
        type={TriggerComponent === 'button' ? 'button' : undefined}
        aria-label={ariaLabel || undefined}
        aria-describedby={dialog ? undefined : this.id}
        className={triggerClasses}
        ref={this.setTriggerElement}
        {...others}
        {...linkTriggerOverrides}
        {...eventHandlers}
      >
        {children}
      </TriggerComponent>
    );
  }

  renderContent() {
    const {
      dialog,
      inversed,
      interactiveBorder,
      placement,
      maxWidth,
      title,
      transitionDuration,
      zIndex,
    } = this.props;

    const tooltipStyle = { maxWidth, zIndex };
    const interactiveBorderStyle = {
      left: `-${interactiveBorder}px`,
      top: `-${interactiveBorder}px`,
      border: `${interactiveBorder}px solid transparent`,
      zIndex: '-999', // ensures interactive border doesnt cover tooltip content
    };

    const eventHandlers = dialog
      ? {}
      : {
          onBlur: () => this.handleBlur(),
        };

    const tooltipContent = () => (
      <div
        id={this.id}
        tabIndex={dialog ? '-1' : null}
        ref={this.setTooltipElement}
        className={classNames('ds-c-tooltip', {
          'ds-c-tooltip--inverse': inversed,
        })}
        style={tooltipStyle}
        data-placement={placement}
        aria-hidden={!this.state.active}
        role={dialog ? 'dialog' : 'tooltip'}
        {...eventHandlers}
      >
        <span className="ds-c-tooltip__arrow" data-popper-arrow />
        <div className="ds-c-tooltip__content ds-base">{title}</div>
        {!dialog && (
          <span className="ds-c-tooltip__interactive-border" style={interactiveBorderStyle} />
        )}
      </div>
    );
    return (
      <CSSTransition in={this.state.active} classNames="ds-c-tooltip" timeout={transitionDuration}>
        {dialog ? (
          <FocusTrap
            active={this.state.active}
            focusTrapOptions={{
              // Set initialFocus to the tooltip container element in case it contains no focusable elements
              initialFocus: `#${this.id}`,
              clickOutsideDeactivates: true,
            }}
          >
            {tooltipContent()}
          </FocusTrap>
        ) : (
          tooltipContent()
        )}
      </CSSTransition>
    );
  }

  render() {
    const eventHandlers = this.props.dialog
      ? {}
      : {
          onMouseEnter: () => {
            if (!this.state.isMobile) {
              this.setState({ isHover: true });
              this.setTooltipActive(true);
            }
          },
          onMouseLeave: () => {
            if (!this.state.isMobile) {
              this.setState({ isHover: false });
              this.setTooltipActive(false);
            }
          },
        };

    return (
      <div className="ds-c-tooltip__container" {...eventHandlers}>
        {this.renderTrigger()}
        {this.renderContent()}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  component: 'button',
  interactiveBorder: 15,
  maxWidth: '300px',
  offset: [0, 5],
  placement: 'top',
  transitionDuration: 250, // Equivalent to $animation-speed-1
  zIndex: '9999',
};
Tooltip.propTypes = {
  /**
   * Classes applied to the tooltip trigger when the tooltip is active
   */
  activeClassName: PropTypes.string,
  /**
   * Helpful description of the tooltip for screenreaders
   */
  ariaLabel: PropTypes.string,
  /**
   * Tooltip trigger content
   */
  children: PropTypes.node.isRequired,
  /**
   * When provided, this will render the passed in component for the tooltip trigger. Typically this will be a `button`, `a`,
 or rarely an `input` element.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  /**
   * Classes applied to the tooltip trigger
   */
  className: PropTypes.string,
  /**
   * Tooltip that behaves like a dialog, i.e. a tooltip that only appears on click, traps focus, and contains interactive content. For more information, see Deque's [tooltip dialog documentation](https://dequeuniversity.com/library/aria/tooltip-dialog)
   */
  dialog: PropTypes.bool,
  /**
   * `id` applied to tooltip body container element. If not provided, a unique id will be automatically generated and used.
   */
  id: PropTypes.string,
  /**
   * Sets the size of the invisible border around interactive tooltips that prevents it from immediately hiding when the cursor leaves the tooltip.
   */
  interactiveBorder: PropTypes.number,
  inversed: PropTypes.bool,
  /**
   * Applies `skidding` and `distance` offsets to the tooltip relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/modifiers/popper-offsets/) for more info.
   */
  offset: PropTypes.arrayOf(PropTypes.number),
  /**
   * Called when the tooltip is hidden
   */
  onClose: PropTypes.func,
  /**
   * Called when the tooltip is shown
   */
  onOpen: PropTypes.func,
  /**
   * Placement of the tooltip body relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/constructors/#options) for more info.
   */
  placement: PropTypes.oneOf(['auto', 'bottom', 'top', 'right', 'left']),
  /**
   * `maxWidth` styling applied to the tooltip body
   */
  maxWidth: PropTypes.string,
  /**
   * Content inside the tooltip body or popover. If this contains interactive elements use the `dialog` prop.
   */
  title: PropTypes.node.isRequired,
  /**
   * Duration of the `react-transition-group` CSSTransition. See the [`timeout` option](http://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout) for more info.
   */
  transitionDuration: PropTypes.number,
  /**
   * `zIndex` styling applied to the tooltip body
   */
  zIndex: PropTypes.string,
};

export default Tooltip;
