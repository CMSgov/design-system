import { Manager, Popper, Reference } from 'react-popper';
import CSSTransition from 'react-transition-group/CSSTransition';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.parentElement = null;
    this.setParentElement = (element) => {
      this.parentElement = element;
    };

    this.state = { active: false };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    const ESCAPE_KEY = 27;
    if (this.props.interactive && this.state.active && e.keyCode === ESCAPE_KEY) {
      this.hideTooltip();
    }
  }

  hideTooltip() {
    this.setState({ active: false });
  }

  showTooltip() {
    this.setState({ active: true });
  }

  handleTriggerBlur() {
    // Hide tooltips when blurring away from the trigger or interactive content
    if (this.props.interactive) {
      setTimeout(() => {
        if (!this.parentElement.contains(document.activeElement)) {
          this.hideTooltip();
        }
      }, 20);
    } else {
      this.hideTooltip();
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
      triggerActiveClassName,
      triggerClassName,
      triggerContent,
      triggerId,
    } = this.props;

    const TriggerComponent = this.triggerComponentType();
    const triggerClasses = classNames('ds-c-tooltip__trigger', triggerClassName, { [triggerActiveClassName]: this.state.active });

    return (
      <Reference>
        {({ ref }) => (
          <TriggerComponent
            id={triggerId}
            type={TriggerComponent === "button" ? "button" : undefined}
            onTouchStart={() => this.showTooltip()}
            onFocus={() => this.showTooltip()}
            onBlur={() => this.handleTriggerBlur()}
            onMouseEnter={() => this.showTooltip()}
            onMouseLeave={() => this.hideTooltip()}
            aria-label={`Tooltip: ${ariaLabel || ''}`}
            aria-describedby={`tooltip-${triggerId}`}
            className={triggerClasses}
            ref={ref}
          >
            {triggerContent}
          </TriggerComponent>
        )}
      </Reference>
    );
  }

  renderContent() {
    const {
      children,
      inverse,
      interactive,
      interactiveBorder,
      placement,
      className,
      maxWidth,
      offset,
      zIndex,
      transitionDuration,
      triggerId,
    } = this.props;

    const tooltipContent = (arrowProps, arrowStyle) => (
      <>
        <div className="ds-c-tooltip__arrow" ref={arrowProps.ref} style={arrowStyle} />
        <div className="ds-c-tooltip__content ds-base">{children}</div>
      </>
    );

    return (
      <CSSTransition in={this.state.active} classNames="ds-c-tooltip" unmountOnExit timeout={transitionDuration}>
        <Popper
          placement={placement}
          modifiers={{ offset: { offset: offset } }}
        >
          {({ placement, ref, style, arrowProps }) => {
            const tooltipStyle = {
              ...style,
              ...{ maxWidth, zIndex },
            };
            const arrowStyle = { 
              top: parseInt(arrowProps.style.top, 10),
              left: parseInt(arrowProps.style.left, 10)
            };
            const interactiveBorderStyle = { 
              left: `-${interactiveBorder}px`,
              top: `-${interactiveBorder}px`,
              border: `${interactiveBorder}px solid transparent`
            }
            return (
              <div
                id={`tooltip-${triggerId}`}
                ref={ref}
                className={classNames('ds-c-tooltip', {
                  'ds-c-tooltip--inverse': inverse,
                }, className)}
                style={tooltipStyle}
                onMouseEnter={() => interactive ? this.showTooltip() : null }
                onMouseLeave={() => this.hideTooltip()}
                data-placement={placement}
                aria-labelledby={triggerId}
                role={interactive ? 'dialog' : 'tooltip'}
              >
                {interactive ? (
                  // Child of focus trap must be a single node and valid HTML element, no <Fragment>
                  // Set initialFocus to the trigger element to ensure trigger aria-label is read
                  <FocusTrap focusTrapOptions={{ initialFocus: triggerId }}>
                    <div>
                      <div className="ds-c-tooltip__interactive-border" style={interactiveBorderStyle} />
                      {tooltipContent(arrowProps, arrowStyle)}
                    </div>
                  </FocusTrap>
                ) : tooltipContent(arrowProps, arrowStyle)}
              </div>
            );
          }}
        </Popper>
      </CSSTransition>
    );
  }

  render() {
    return (
      <Manager>
        <div ref={this.setParentElement}>
          {this.renderTrigger()}
          {this.renderContent()}
        </div>
      </Manager>
    );
  }
}

Tooltip.defaultProps = {
  interactiveBorder: '20',
  placement: 'top',
  maxWidth: '300px',
  zIndex: '1',
  offset: '5, 5, 5, 5',
  triggerComponent: 'button',
  transitionDuration: 250, // Equivalent to $animation-speed-1
};
Tooltip.propTypes = {
  /**
   * Helpful description of the tooltip for screenreaders
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * Content inside the tooltip body or popover. If this contains interactive elements set the `interactive` prop.
   */
  children: PropTypes.node.isRequired,
  /**
   * Classes applied to the tooltip body
   */
  className: PropTypes.string,
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
  * Tooltip body offset relative to the trigger. See the [`react-popper` docs](https://popper.js.org/docs/v1/#modifiersoffset) for more info.
  */
  offset: PropTypes.string,
  /**
   * Placement of the tooltip body relative to the trigger. See the [`react-popper` docs](https://popper.js.org/docs/v1/#popperplacements--codeenumcode) for more info.
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
