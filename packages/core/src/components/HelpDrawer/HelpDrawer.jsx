import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';

export class HelpDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headingRef = null;

    if (process.env.NODE_ENV !== 'production') {
      if (props.title) {
        console.warn(
          `[Deprecated]: Please remove the 'title' prop in <Button>, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (!props.title && !props.heading) {
        console.warn(
          `The 'heading' prop in <Button>, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
    }
  }

  componentDidMount() {
    if (this.headingRef) this.headingRef.focus();
  }

  render() {
    const {
      ariaLabel,
      closeButtonText,
      title,
      children,
      onCloseClick,
      heading,
      footerBody,
      footerTitle
    } = this.props;
    const Heading = `h${this.props.headingLevel}` || `h3`;

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/no-danger */
    return (
      <div className="ds-c-help-drawer">
        <div className="ds-c-help-drawer__header">
          {/* The nested div below might seem redundant, but we need a
           * separation between our sticky header, and the flex container
           * so things display as expected when the body content overflows
           */}
          <div className="ds-u-fill--gray-lightest ds-u-padding--2 ds-u-display--flex ds-u-align-items--start">
            <Heading
              ref={el => (this.headingRef = el)}
              tabIndex="0"
              className="ds-u-text--lead ds-u-margin-y--0 ds-u-margin-right--2"
            >
              {// TODO: make heading required after removing title
              title || heading}
            </Heading>
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
  closeButtonText: 'Close',
  headingLevel: '3'
};
HelpDrawer.propTypes = {
  /**
   * Helps give more context to screen readers on the button that closes the Help Drawer
   */
  ariaLabel: PropTypes.string,
  closeButtonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerBody: PropTypes.node,
  footerTitle: PropTypes.string,
  /**
   * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading: PropTypes.string,
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  onCloseClick: PropTypes.func.isRequired,
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title: PropTypes.string
};

export default HelpDrawer;
