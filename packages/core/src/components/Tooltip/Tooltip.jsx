import { Manager, Popper, Reference } from 'react-popper';
import React, { Fragment } from 'react';
import Transition, { ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';
import Button from '../Button/Button';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TooltipIcon from './TooltipIcon';
import classNames from 'classnames';

const transitionDuration = 300;
const defaultTransitionStyle = {
  transition: `opacity ${transitionDuration}ms`,
  opacity: 0
};
const transitionStyles = {
  [ENTERING]: { opacity: 0 },
  [ENTERED]: { opacity: 1 },
  [EXITING]: { opacity: 0 }
};

const TOOLTIP_OFFSET_OPT = '5, 5, 5, 5';
const TOOLTIP_OFFSET = 5;

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      focusEventTriggered: false
    };
  }

  handleFocus() {
    this.setState({ showTooltip: true, focusEventTriggered: true });
  }

  hideTooltip() {
    this.setState({ showTooltip: false, focusEventTriggered: false });
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  renderTrigger() {
    const {
      ariaLabel,
      hasInteractiveContent,
      iconClasses,
      id,
      inverse,
      triggerClasses,
      triggerContent
    } = this.props;
    return (
      <Reference>
        {({ ref }) => (
          <button
            id={id}
            type="button"
            onTouchStart={() => this.showTooltip()}
            onFocus={this.handleFocus}
            onBlur={hasInteractiveContent ? null : () => this.hideTooltip()}
            onMouseEnter={() => this.showTooltip()}
            onMouseLeave={() => this.hideTooltip()}
            aria-label={`Tooltip: ${ariaLabel || ''}`}
            className={classNames('ds-c-tooltip__trigger', triggerClasses)}
            ref={ref}
          >
            {triggerContent || (
              <TooltipIcon
                hasTriggerContent={triggerContent != null}
                iconClasses={iconClasses}
                inverse={inverse}
                showTooltip={this.state.showTooltip}
              />
            )}
          </button>
        )}
      </Reference>
    );
  }

  renderContent() {
    const {
      children,
      id,
      hasInteractiveContent,
      positionFixed,
      placement,
      tooltipMaxWidth,
      tooltipZIndex,
      tooltipBodyInverse
    } = this.props;
    const bodyElement = document.querySelector('body');

    const interactiveContent = (arrowProps, arrowStyle) => (
      // Child of focus trap must be a single node and valid HTML element, no <Fragment>
      <FocusTrap>
        <div>
          <div className="ds-c-tooltip__arrow" ref={arrowProps.ref} style={arrowStyle} />
          <div className="ds-c-tooltip__content ds-base">
            {children}
            <div className="ds-u-justify-content--end ds-u-display--flex">
              <Button
                className="qa-tooltip-close-button"
                size="small"
                onClick={() => this.hideTooltip()}
              >
                Close
              </Button>
            </div>
          </div>
          <div
            style={{ left: arrowProps.style.left }}
            className="ds-c-tooltip__invisible-button"
            onTouchStart={() => this.hideTooltip()}
          />
        </div>
      </FocusTrap>
    );
    const nonInteractiveContent = (arrowProps, arrowStyle) => (
      <Fragment>
        <div className="ds-c-tooltip__arrow" ref={arrowProps.ref} style={arrowStyle} />
        <div className="ds-c-tooltip__content ds-base">{children}</div>
        <div
          style={{ left: arrowProps.style.left }}
          className="ds-c-tooltip__invisible-button"
          onTouchStart={() => this.hideTooltip()}
        />
      </Fragment>
    );
    return ReactDOM.createPortal(
      <Transition in={this.state.showTooltip} unmountOnExit timeout={transitionDuration}>
        {transitionState => (
          <Popper
            positionFixed={positionFixed}
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
                ...defaultTransitionStyle,
                ...transitionStyles[transitionState],
                ...{ maxWidth: tooltipMaxWidth || '300px' },
                ...{ zIndex: tooltipZIndex || '1' }
              };
              return (
                <div
                  className={classNames('ds-c-tooltip__container', {
                    'inverse-tooltip-body': tooltipBodyInverse
                  })}
                  onMouseEnter={() => this.showTooltip()}
                  onMouseLeave={() => this.hideTooltip()}
                  ref={ref}
                  style={newStyle}
                  modifiers={{ offset: TOOLTIP_OFFSET }}
                  data-placement={placement}
                  aria-labelledby={id}
                >
                  {hasInteractiveContent && this.state.focusEventTriggered
                    ? interactiveContent(arrowProps, arrowStyle)
                    : nonInteractiveContent(arrowProps, arrowStyle)}
                </div>
              );
            }}
          </Popper>
        )}
      </Transition>,
      bodyElement
    );
  }

  render() {
    const bodyElement = document.querySelector('body');
    return (
      <Manager>
        {this.renderTrigger()}
        {bodyElement !== null && this.renderContent()}
      </Manager>
    );
  }
}

Tooltip.defaultProps = {
  placement: 'top'
};
Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  // tooltip content includes links or buttons that needs to be tabbable
  hasInteractiveContent: PropTypes.bool,
  positionFixed: PropTypes.bool,
  placement: PropTypes.string,
  // the tooltip icon/trigger inverse style applied or not
  inverse: PropTypes.bool,
  // the tooltip itself (text content/container) inverse style applied or not
  tooltipBodyInverse: PropTypes.bool,
  id: PropTypes.string,
  triggerContent: PropTypes.node,
  triggerClasses: PropTypes.string,
  ariaLabel: PropTypes.string,
  tooltipMaxWidth: PropTypes.string,
  tooltipZIndex: PropTypes.string,
  // added to <g> that controls SVG fill color, for overriding color
  iconClasses: PropTypes.string
};

export default Tooltip;
