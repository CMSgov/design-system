import PropTypes from 'prop-types';
import React from 'react';
import ReviewLink from './ReviewLink';
import classNames from 'classnames';

/**
 * The `Review` component wraps up the styles and markup required to make a
 * single reviewable row. They are designed to be used either alone, as a single
 * row, or multiple rows can be combined together one after the other to present
 * more information. The component can take text or HTML as row content.
 */
export class Review extends React.PureComponent {
  heading() {
    const Heading = this.props.headingLevel
      ? `h${this.props.headingLevel}`
      : `h3`;
    if (this.props.heading) {
      return (
        <Heading className="ds-c-review__heading ds-text ds-u-margin-bottom--0 ds-u-font-weight--bold ds-u-display--inline-block">
          {this.props.heading}
        </Heading>
      );
    }
  }

  render() {
    const { children, className, editHref, editText, onEditClick } = this.props;
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
        {editHref && (
          <ReviewLink onClick={onEditClick} href={editHref}>
            {editText}
          </ReviewLink>
        )}
      </div>
    );
  }
}

Review.defaultProps = {
  editText: 'Edit'
};

Review.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.node,
  /**
   * Heading type to override default `<h3>`.
   */
  headingLevel: PropTypes.number,
  editHref: PropTypes.string,
  editText: PropTypes.node,
  /**
   * An optional function that is executed on edit link click. The event and
   * props.editHref value are passed to this function.
   */
  onEditClick: PropTypes.func
};

export default Review;
