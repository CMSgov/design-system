import FocusTrap from 'focus-trap-react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';

export class SlidingPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headingRef = null;
    this.id = this.props.headingId || uniqueId('slidingPanel_');
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  componentDidMount() {
    if (this.props.hasFocusTrap) document.addEventListener('keydown', this.handleEscapeKey);
    if (this.headingRef) this.headingRef.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleEscapeKey(evt) {
    switch (evt.code) {
      case 'Escape':
        this.props.onCloseClick();
        break;
      default:
        break;
    }
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      closeButtonText,
      footerBody,
      footerTitle,
      hasFocusTrap,
      heading,
      isHeaderSticky,
      isFooterSticky,
      onCloseClick,
    } = this.props;
    const Heading = `h${this.props.headingLevel}` || `h3`;

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/no-danger */
    const slidingPanelMarkup = () => (
      <div
        aria-labelledby={this.id}
        className={classNames(className, 'ds-c-sliding-panel')}
        role="dialog"
      >
        <div className="ds-c-sliding-panel__window">
          <div className="ds-c-sliding-panel__header">
            <Heading
              tabIndex="0"
              id={this.id}
              className="ds-c-sliding-panel__header-heading"
              ref={(el) => (this.headingRef = el)}
            >
              {heading}
            </Heading>
            <Button
              aria-label={ariaLabel}
              className="ds-c-sliding-panel__close-button"
              size="small"
              onClick={onCloseClick}
            >
              {closeButtonText}
            </Button>
          </div>
          <div
            className={classNames('ds-c-sliding-panel__body', {
              'ds-c-sliding-panel--is-sticky': isHeaderSticky || isFooterSticky,
            })}
          >
            {children}
          </div>
          <div className="ds-c-sliding-panel__footer">
            <h4 className="ds-c-sliding-panel__footer-title">{footerTitle}</h4>
            <div className="ds-c-sliding-panel__footer-body">{footerBody}</div>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {hasFocusTrap ? (
          <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
            {slidingPanelMarkup()}
          </FocusTrap>
        ) : (
          slidingPanelMarkup()
        )}
      </>
    );
  }
}

SlidingPanel.defaultProps = {
  ariaLabel: 'Close help drawer',
  closeButtonText: 'Close',
  headingLevel: '3',
};

// TODO: closeButtonText, heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
SlidingPanel.propTypes = {
  /**
   * Gives more context to screen readers on the SlidingPanel close button.
   */
  ariaLabel: PropTypes.string,
  closeButtonText: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  footerBody: PropTypes.node,
  footerTitle: PropTypes.string,
  /**
   * Enables focus trap functionality within SlidingPanel.
   */
  hasFocusTrap: PropTypes.bool,
  /**
   * Text for the SlidingPanel heading. Required because the `heading` will be focused on mount.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * A unique `id` to be used on heading element to label multiple instances of SlidingPanel.
   */
  headingId: PropTypes.string,
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  /**
   * Enables "sticky" position of SlidingPanel header element.
   */
  isHeaderSticky: PropTypes.bool,
  /**
   * Enables "sticky" position of SlidingPanel footer element.
   */
  isFooterSticky: PropTypes.bool,
  onCloseClick: PropTypes.func.isRequired,
};

export default SlidingPanel;
