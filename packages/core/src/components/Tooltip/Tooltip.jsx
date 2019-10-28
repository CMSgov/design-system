import { Manager, Popper, Reference } from 'react-popper';
import Transition, {
  ENTERED,
  ENTERING,
  EXITING
} from 'react-transition-group/Transition';
import Button from '../Button/Button';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
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

  render() {
    const body = document.querySelector('body');
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <button
              type="button"
              onTouchStart={() => this.showTooltip()}
              onFocus={() => this.handleFocus()}
              onBlur={
                this.props.hasInteractiveContent
                  ? null
                  : () => this.hideTooltip()
              }
              onMouseEnter={() => this.showTooltip()}
              onMouseLeave={() => this.hideTooltip()}
              id={this.props.id}
              aria-label={`Tooltip: ${this.props.ariaLabel || ''}`}
              className={classNames(
                'ds-c-tooltip__trigger',
                this.props.triggerClasses
              )}
              ref={ref}
            >
              {this.props.triggerContent}
              <TooltipIcon
                hasTriggerContent={this.props.triggerContent != null}
                iconClasses={this.props.iconClasses}
                inverse={this.props.inverse}
                showTooltip={this.state.showTooltip}
              />
            </button>
          )}
        </Reference>
        {body !== null &&
          // Need to use portal or else positioning is off in IE11 sometimes
          ReactDOM.createPortal(
            <Transition
              in={this.state.showTooltip}
              unmountOnExit
              timeout={transitionDuration}
            >
              {transitionState => (
                <Popper
                  positionFixed={this.props.positionFixed}
                  placement={this.props.placement}
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
                      ...transitionStyles[transitionState]
                    };
                    newStyle.maxWidth = this.props.tooltipMaxWidth || '300px';
                    newStyle.zIndex = this.props.tooltipZIndex || '1';
                    return (
                      <div
                        className={classNames('ds-c-tooltip__container', {
                          'inverse-tooltip-body': this.props.tooltipBodyInverse
                        })}
                        onMouseEnter={() => this.showTooltip()}
                        onMouseLeave={() => this.hideTooltip()}
                        ref={ref}
                        style={newStyle}
                        modifiers={{ offset: TOOLTIP_OFFSET }}
                        data-placement={placement}
                      >
                        {this.props.hasInteractiveContent &&
                        this.state.focusEventTriggered ? (
                          <FocusTrap>
                            {/* child of focus trap must be a single node, and must a valid HTML element, so no fragment */}
                            <div>
                              <div
                                className="ds-c-tooltip__arrow"
                                ref={arrowProps.ref}
                                style={arrowStyle}
                              />
                              <div className="ds-c-tooltip__content ds-base">
                                {this.props.children}
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
                        ) : (
                          <React.Fragment>
                            <div
                              className="ds-c-tooltip__arrow"
                              ref={arrowProps.ref}
                              style={arrowStyle}
                            />
                            <div className="ds-c-tooltip__content ds-base">
                              {this.props.children}
                            </div>
                            <div
                              style={{ left: arrowProps.style.left }}
                              className="ds-c-tooltip__invisible-button"
                              onTouchStart={() => this.hideTooltip()}
                            />
                          </React.Fragment>
                        )}
                      </div>
                    );
                  }}
                </Popper>
              )}
            </Transition>,
            body
          )}
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
