import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';

export class HelpDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.titleRef = null;
  }

  componentDidMount() {
    if (this.titleRef) this.titleRef.focus();
  }

  render() {
    const {
      ariaLabel,
      closeButtonText,
      title,
      children,
      onCloseClick,
      footerBody,
      footerTitle
    } = this.props;
    /* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/no-danger */
    return (
      <div className="ds-c-help-drawer">
        <div className="ds-c-help-drawer__header">
          {/* The nested div below might seem redundant, but we need a
           * separation between our sticky header, and the flex container
           * so things display as expected when the body content overflows
           */}
          <div className="ds-u-fill--gray-lightest ds-u-padding--2 ds-u-display--flex ds-u-align-items--start">
            <h3
              ref={el => (this.titleRef = el)}
              tabIndex="0"
              className="ds-u-text--lead ds-u-margin-y--0 ds-u-margin-right--2"
            >
              {title}
            </h3>
            <Button
              aria-label={ariaLabel}
              className="ds-u-margin-left--auto ds-c-help-drawer__close-button"
              size="small"
              onClick={onCloseClick}
            >
              {closeButtonText}
            </Button>
          </div>
        </div>
        <div className="ds-c-help-drawer__body">
          <div className="ds-c-help-drawer__content ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2">
            {children}
          </div>
          <div className="ds-c-help-drawer__footer ds-u-fill--primary-alt-lightest ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2">
            <h4 className="ds-text ds-u-margin--0">{footerTitle}</h4>
            <div className="ds-text ds-u-margin--0">{footerBody}</div>
          </div>
        </div>
      </div>
    );
  }
}

HelpDrawer.defaultProps = {
  ariaLabel: 'Close help drawer',
  closeButtonText: 'Close'
};
HelpDrawer.propTypes = {
  /** Helps give more context to screen readers on the button that closes the Help Drawer */
  ariaLabel: PropTypes.string,
  closeButtonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerBody: PropTypes.node,
  footerTitle: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  /** Required because the title is what gets focused on mount */
  title: PropTypes.string.isRequired
};

export default HelpDrawer;
