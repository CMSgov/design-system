import CSSTransition from 'react-transition-group/CSSTransition';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { createPopper } from '@popperjs/core';

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.triggerElement = null;
    this.tooltipElement = null;

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
    if (this.state.active && this.props.clickOnly) {
      const clickedTooltip = this.tooltipElement && this.tooltipElement.contains(event.target);
      if (!clickedTooltip) {
        this.setTooltipActive(false);
      }
    }
  }

  handleEscapeKey(e) {
    // Closes interactive and click only tooltips when ESC key is pressed
    const ESCAPE_KEY = 27;
    if (this.state.active && e.keyCode === ESCAPE_KEY) {
      if (this.props.interactive || this.props.clickOnly) {
        this.setTooltipActive(false);
      }
    }
  }

  setTooltipActive(active) {
    this.setState({ active }, () => {
      this.popper.forceUpdate();
    });
  }

  handleBlur() {
    // Hide tooltips when blurring away from the trigger or tooltip body
    setTimeout(() => {
      const focusedInsideTrigger =
        this.triggerElement && this.triggerElement.contains(document.activeElement);
      const focusedInsideTooltip =
        this.tooltipElement && this.tooltipElement.contains(document.activeElement);
      if (!focusedInsideTrigger && !focusedInsideTooltip) {
        this.setTooltipActive(false);
      }
    }, 10);
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
      clickOnly,
      ariaLabel,
      triggerActiveClassName,
      triggerClassName,
      triggerContent,
      triggerHref,
      triggerId,
    } = this.props;

    const TriggerComponent = this.triggerComponentType();
    const triggerClasses = classNames('ds-c-tooltip__trigger', 'ds-base', triggerClassName, {
      [triggerActiveClassName]: this.state.active,
      'ds-c-tooltip__trigger--click-only-active': this.props.clickOnly && this.state.active,
    });

    return (
      <TriggerComponent
        id={triggerId}
        type={TriggerComponent === 'button' ? 'button' : undefined}
        onTouchStart={() => this.setTooltipActive(!this.state.active)}
        onFocus={() => (clickOnly ? null : this.setTooltipActive(true))}
        onBlur={() => (clickOnly ? null : this.handleBlur())}
        onMouseEnter={() => (clickOnly ? null : this.setTooltipActive(true))}
        onMouseLeave={() => (clickOnly ? null : this.setTooltipActive(false))}
        onClick={() => this.setTooltipActive(!this.state.active)}
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
      clickOnly,
      children,
      inversed,
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
      <div
        id={`tooltip-${triggerId}`}
        tabIndex="-1"
        ref={this.setTooltipElement}
        className={classNames(
          'ds-c-tooltip',
          {
            'ds-c-tooltip--inverse': inversed,
          },
          className
        )}
        style={tooltipStyle}
        onMouseEnter={() => (interactive ? this.setTooltipActive(true) : null)}
        onMouseLeave={() => (clickOnly ? null : this.setTooltipActive(false))}
        onBlur={() => this.handleBlur()}
        data-placement={placement}
        aria-labelledby={triggerId}
        aria-hidden={!this.state.active}
        role={clickOnly ? 'dialog' : 'tooltip'}
      >
        <div className="ds-c-tooltip__arrow" data-popper-arrow />
        <div className="ds-c-tooltip__content ds-base">{children}</div>
        {interactive && (
          <div className="ds-c-tooltip__interactive-border" style={interactiveBorderStyle} />
        )}
      </div>
    );

    return (
      <CSSTransition in={this.state.active} classNames="ds-c-tooltip" timeout={transitionDuration}>
        {clickOnly ? (
          <FocusTrap
            active={this.state.active}
            focusTrapOptions={{
              // Set initialFocus to the tooltip container element in case it contains no focusable elements
              initialFocus: `#tooltip-${triggerId}`,
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
    return (
      <div>
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
   * Disables tooltip activation and deactivation on hover, touch and blur events.
   */
  clickOnly: PropTypes.bool,
  /**
   * Should be set to `true` if tooltip content includes tabbable elements like links or buttons. Interactive tooltips trap focus, expands the activation area to include the tooltip itself, and includes other accessibility changes.
   */
  interactive: PropTypes.bool,
  /**
   * Sets the size of the invisible border around the tooltip that prevents it from immediately hiding when the cursor leaves the toolip.
   */
  interactiveBorder: PropTypes.number,
  inversed: PropTypes.bool,
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
