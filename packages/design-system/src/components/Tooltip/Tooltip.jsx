import { Manager, Popper, Reference } from 'react-popper';
import Transition, { ENTERED, ENTERING, EXITED, EXITING } from 'react-transition-group/Transition';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

// Transition component config
const transitionDuration = 300; // Equivalent to $animation-speed-2
const transitionStyles = {
  [ENTERING]: { opacity: 1 },
  [ENTERED]: { opacity: 1 },
  [EXITING]: { opacity: 0 },
  [EXITED]: { opacity: 0 },
};

// React popper config
const TOOLTIP_OFFSET_OPT = '5, 5, 5, 5';
const TOOLTIP_OFFSET = 5;

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.parentElement = null;
    this.setParentElement = (element) => {
      this.parentElement = element;
    };

    this.state = { showTooltip: true };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    const ESCAPE_KEY = 27;
    if (this.props.hasInteractiveContent && this.state.showTooltip && e.keyCode === ESCAPE_KEY) {
      this.hideTooltip();
    }
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  handleTriggerBlur() {
    // Hide tooltips when blurring away from the trigger or interactive content
    if (this.props.hasInteractiveContent) {
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
      id,
      triggerActiveClassName,
      triggerClassName,
      triggerContent,
    } = this.props;

    const TriggerComponent = this.triggerComponentType();
    const triggerClasses = classNames('ds-c-tooltip__trigger', triggerClassName, { [triggerActiveClassName]: this.state.showTooltip });

    return (
      <Reference>
        {({ ref }) => (
          <TriggerComponent
            id={id}
            type={TriggerComponent === "button" ? "button" : undefined}
            onTouchStart={() => this.showTooltip()}
            onFocus={() => this.showTooltip()}
            onBlur={() => this.handleTriggerBlur()}
            onMouseEnter={() => this.showTooltip()}
            onMouseLeave={() => this.hideTooltip()}
            aria-label={`Tooltip: ${ariaLabel || ''}`}
            aria-describedby={`tooltip-${id}`}
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
      id,
      inverse,
      hasInteractiveContent,
      placement,
      tooltipMaxWidth,
      tooltipZIndex,
      tooltipBodyClassName,
    } = this.props;

    const tooltipContent = (arrowProps, arrowStyle) => (
      <>
        <div className="ds-c-tooltip__arrow" ref={arrowProps.ref} style={arrowStyle} />
        <div className="ds-c-tooltip__content ds-base">{children}</div>
        <div
          style={{ left: arrowProps.style.left }}
          className="ds-c-tooltip__invisible-button"
          onTouchStart={() => this.hideTooltip()}
        />
      </>
    );

    return (
      <Transition in={this.state.showTooltip} unmountOnExit timeout={transitionDuration}>
        {(transitionState) => (
          <Popper
            placement={placement}
            modifiers={{ offset: { offset: TOOLTIP_OFFSET_OPT } }}
          >
            {({ placement, ref, style, arrowProps }) => {
              // Need to add back 1/2 width of arrow to the left placement of the
              // tooltip container so the arrow shows up at exactly 50% as the
              // arrow container has a width/height we are setting that the
              // arrowProps positioning here does not account for
              let leftArrowOffset = 0;
              if (parseInt(arrowProps.style.left, 10)) {
                leftArrowOffset = arrowProps.style.left + 8;
              }
              const arrowStyle = { left: leftArrowOffset };

              // Can't directly modify style, so copy and add styles from props
              const newStyle = {
                ...style,
                ...transitionStyles[transitionState],
                ...{
                  maxWidth: tooltipMaxWidth,
                  zIndex: tooltipZIndex,
                },
              };

              return (
                <div
                  id={`tooltip-${id}`}
                  ref={ref}
                  className={classNames('ds-c-tooltip__container', tooltipBodyClassName, {
                    'inverse-tooltip-body': inverse,
                  })}
                  style={newStyle}
                  onMouseEnter={() => this.showTooltip()}
                  onMouseLeave={() => this.hideTooltip()}
                  data-placement={placement}
                  modifiers={{ offset: TOOLTIP_OFFSET }}
                  aria-labelledby={id}
                  role={hasInteractiveContent ? 'dialog' : 'tooltip'}
                >
                  {hasInteractiveContent ? (
                    // Child of focus trap must be a single node and valid HTML element, no <Fragment>
                    // Set initialFocus to the trigger element to ensure trigger aria-label is read
                    <FocusTrap focusTrapOptions={{ initialFocus: this.props.id }}>
                      <div>
                        {tooltipContent(arrowProps, arrowStyle)}
                      </div>
                    </FocusTrap>
                  ) : tooltipContent(arrowProps, arrowStyle)}
                </div>
              );
            }}
          </Popper>
        )}
      </Transition>
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
  placement: 'top',
  tooltipMaxWidth: '300px',
  tooltipZIndex: '1',
  triggerComponent: 'button',
};
Tooltip.propTypes = {
  /**
   * Helpful description of the tooltip for screenreaders
   */
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  /**
   * Should be set to `true` if tooltip content includes tabbable elements like links or buttons. Interactive tooltips have a focus trap, close button, and other accessibility changes to account for interactive elements.
   */
  hasInteractiveContent: PropTypes.bool,
  /**
   * Placement of the tooltip relative to the trigger. See the [`react-popper` docs](https://popper.js.org/react-popper/v2/render-props/#placement) for more info.
   */
  placement: PropTypes.oneOf(['top', 'bottom']),
  inverse: PropTypes.bool,
  /**
   * Id applied to the trigger element, used in  `aria-labelledby`
   */
  id: PropTypes.string.isRequired,
  /**
   * Classes applied to the tooltip body
   */
  tooltipBodyClassName: PropTypes.string,
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
  tooltipMaxWidth: PropTypes.string,
  tooltipZIndex: PropTypes.string,
};

export default Tooltip;
