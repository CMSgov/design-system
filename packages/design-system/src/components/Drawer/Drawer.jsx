import FocusTrap from 'focus-trap-react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';

export class Drawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headingRef = null;
    this.id = this.props.headingId || uniqueId('drawer_');
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
    const drawerMarkup = () => (
      <div aria-labelledby={this.id} className={classNames(className, 'ds-c-drawer')} role="dialog">
        <div className="ds-c-drawer__window">
          <div className="ds-c-drawer__header">
            <Heading
              tabIndex="0"
              id={this.id}
              className="ds-c-drawer__header-heading"
              ref={(el) => (this.headingRef = el)}
            >
              {heading}
            </Heading>
            <Button
              aria-label={ariaLabel}
              className="ds-c-drawer__close-button"
              size="small"
              onClick={onCloseClick}
            >
              {closeButtonText}
            </Button>
          </div>
          <div
            className={classNames('ds-c-drawer__body', {
              'ds-c-drawer--is-sticky': isHeaderSticky || isFooterSticky,
            })}
          >
            {children}
          </div>
          <div className="ds-c-drawer__footer">
            <h4 className="ds-c-drawer__footer-title">{footerTitle}</h4>
            <div className="ds-c-drawer__footer-body">{footerBody}</div>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {hasFocusTrap ? (
          <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
            {drawerMarkup()}
          </FocusTrap>
        ) : (
          drawerMarkup()
        )}
      </>
    );
  }
}

Drawer.defaultProps = {
  ariaLabel: 'Close help drawer',
  closeButtonText: 'Close',
  headingLevel: '3',
};

// TODO: closeButtonText, heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
Drawer.propTypes = {
  /**
   * Gives more context to screen readers on the Drawer close button.
   */
  ariaLabel: PropTypes.string,
  closeButtonText: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  footerBody: PropTypes.node,
  footerTitle: PropTypes.string,
  /**
   * Enables focus trap functionality within Drawer.
   */
  hasFocusTrap: PropTypes.bool,
  /**
   * Text for the Drawer heading. Required because the `heading` will be focused on mount.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * A unique `id` to be used on heading element to label multiple instances of Drawer.
   */
  headingId: PropTypes.string,
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  /**
   * Enables "sticky" position of Drawer header element.
   */
  isHeaderSticky: PropTypes.bool,
  /**
   * Enables "sticky" position of Drawer footer element.
   */
  isFooterSticky: PropTypes.bool,
  onCloseClick: PropTypes.func.isRequired,
};

export default Drawer;
