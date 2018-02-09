import PropTypes from 'prop-types';
import React from 'react';
import ReviewLink from './ReviewLink';
import classNames from 'classnames';

/*
`<Review>`

@react-component Review

Style guide: components.review.react
*/

/**
 * The `Review` component is used for listing a summary of information entered
 * by a user. Its content includes a heading, value, and edit link.
 */
export class Review extends React.PureComponent {
  heading() {
    if (this.props.heading) {
      return (
        <h3 className="ds-text ds-u-margin-bottom--0 ds-u-font-weight--bold ds-u-display--inline-block">
          {this.props.heading}
        </h3>
      );
    }
  }

  render() {
    const classes = classNames(
      'ds-c-review ds-u-border-bottom--2 ds-u-padding-y--2 ds-u-justify-content--between ds-u-display--flex',
      this.props.alignTop && 'ds-u-align-items--center'
    );
    return (
      <div className={classes}>
        <div className="ds-u-margin-right--2">
          {this.heading()}
          <div className="ds-c-review__body">{this.props.children}</div>
        </div>
        <ReviewLink onClick={this.props.onClick} href={this.props.href}>
          {this.props.linkText}
        </ReviewLink>
      </div>
    );
  }
}

Review.defaultProps = {
  alignTop: true,
  linkText: 'Edit'
};

Review.propTypes = {
  /**
   * Set to false to vertically align the edit link.
   */
  alignTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /**
   * An optional function that is executed on link click. The href value is
   * passed to this function.
   */
  onClick: PropTypes.func,
  heading: PropTypes.string,
  href: PropTypes.string.isRequired,
  linkText: PropTypes.node.isRequired
};

export default Review;
