import PropTypes from 'prop-types';
import React from 'react';
import ReviewLink from './ReviewLink';
import classNames from 'classnames';

export class Review extends React.PureComponent {
  heading() {
    const Heading = `h${this.props.headingLevel}` || `h3`;
    if (this.props.heading) {
      return (
        <Heading className="ds-c-review__heading ds-text ds-u-margin-bottom--0 ds-u-font-weight--bold ds-u-display--inline-block">
          {this.props.heading}
        </Heading>
      );
    }
  }

  render() {
    const {
      children,
      className,
      editAriaLabel,
      editHref,
      editText,
      onEditClick,
      editContent
    } = this.props;
    const classes = classNames(
      'ds-c-review ds-u-border-bottom--2 ds-u-padding-y--2 ds-u-justify-content--between ds-u-display--flex',
      className && className
    );
    return (
      <div className={classes}>
        <div className="ds-u-margin-right--2">
          {this.heading()}
          <div className="ds-c-review__body">{children}</div>
        </div>
        {editContent}
        {!editContent && editHref && (
          <ReviewLink onClick={onEditClick} href={editHref} ariaLabel={editAriaLabel}>
            {editText}
          </ReviewLink>
        )}
      </div>
    );
  }
}

Review.defaultProps = {
  editText: 'Edit',
  headingLevel: '3'
};

Review.propTypes = {
  /**
   * `Review` component's body HTML.
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Optional label to give screenreaders longer, more descriptive text to
   * explain the context of an edit link.
   */
  editAriaLabel: PropTypes.string,
  /**
   * An optional node in place of the edit link. If this defined, no edit link will be shown.
   */
  editContent: PropTypes.node,
  /**
   * Href for the edit link. If this is undefined, no edit link will be shown.
   */
  editHref: PropTypes.string,
  editText: PropTypes.node,
  heading: PropTypes.node,
  /**
   * Heading type to override default `<h3>`.
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  /**
   * An optional function that is executed on edit link click. The event and
   * props.editHref value are passed to this function.
   */
  onEditClick: PropTypes.func
  /**
   * An optional node in place of the edit link. If this defined, no edit link will be shown.
   */
};

export default Review;
