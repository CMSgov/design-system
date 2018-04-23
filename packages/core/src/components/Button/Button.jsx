import { color, fill } from '../../utilities/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { border } from '../../utilities/border';
import { css } from 'emotion';
import { font } from '../../utilities/font';
import { lineHeight } from '../../utilities/lineHeight';
import { padding } from '../../utilities/padding';
import styled from 'react-emotion';
import variables from '../../utilities/variables';

const { colors } = variables;

const disabled = inverse => {
  const background = inverse ? fill.backgroundInverse : fill.grayLighter;
  const borderColor = inverse
    ? border.color.backgroundInverse
    : border.color.grayLighter;
  const foreground = inverse ? color.baseInverse : color.grayDark;

  return css`
    ${background};
    ${borderColor};
    ${foreground};
    pointer-events: none;

    &:hover,
    &:active,
    &:focus {
      ${background};
      ${borderColor};
      ${foreground};
    }
  `;
};

const inverse = css`
  ${border.color.borderColorInverse};
  ${color.baseInverse};

  &:active,
  &:focus,
  &:hover {
    ${border.color.borderColorInverse};
    ${color.baseInverse};
  }

  &:active {
    opacity: 0.6;
  }
`;

export const sizes = {
  big: css`
    ${font.size.h3};
    ${padding.y(2)};
  `,
  small: css`
    ${font.size.small};
    ${font.weight.normal};
    ${padding(0.5, 1)};
  `
};

export const variations = {
  primary: css`
    ${color.white};
    ${fill.primary};
    border: 0; // Remove the default border to support easier theming

    &:focus,
    &:hover {
      ${color.white};
      ${fill.primaryDarker};
    }

    &:active {
      ${fill.primaryDarkest};
    }
  `,
  transparent: css`
    ${border.color.transparent};

    &:focus,
    &:hover,
    &:active {
      ${border.color.transparent};
    }
  `,
  danger: css`
    ${fill.error} ${border.color.error};
    ${color.white};

    &:focus,
    &:hover {
      ${fill.errorDark} ${border.color.errorDark};
      ${color.white};
    }

    &:active {
      ${fill.errorDarkest} ${border.color.errorDarkest};
    }
  `,
  success: css`
    ${fill.success} ${border.color.success};
    ${color.white};

    &:focus,
    &:hover {
      ${fill.successDark} ${border.color.successDark};
      ${color.white};
    }

    &:active {
      ${fill.successDarkest} ${border.color.successDarkest};
    }
  `
};

const generateStyledComponent = type => styled(type)`
  ${color.primary};
  ${border.radius};
  ${fill.transparent};
  ${font.sans};
  ${font.size.base};
  ${font.weight.bold};
  ${lineHeight.input};
  ${padding(1, 3)};
  appearance: none;
  border: 1px solid ${colors.primary};
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;

  &:focus,
  &:hover {
    ${border.color.primaryDarker};
    ${color.primaryDarker};
  }

  &:active {
    ${border.color.primaryDarkest};
    ${color.primaryDarkest};
  }

  ${props => props.inverse && !props.disabled && inverse};
  ${props => props.variation && variations[props.variation]};
  ${props => props.size && sizes[props.size]};
  ${props => props.disabled && disabled(props.inverse)};
`;

/**
 * The `Button` component accepts its text as children (AKA inner HTML), which
 * means you can also pass in HTML or custom components. This gives you a lot of
 * flexibility and supports a variety of advanced use cases. The most common use
 * case would be passing in an SVG icon along with the text.
 *
 * In addition to the supported props listed, you can also pass in additional
 * props, which will be passed to the rendered root component. For example,
 * you could pass in a `target` prop to pass to the rendered anchor element.
 */
export class Button extends React.PureComponent {
  // Get an object of props to pass to the rendered <Button> component
  attrs() {
    /**
     * Since any number of arbitrary props can be passed into this component, we
     * use a destructuring assignment to get only the props we want to pass to the
     * rendered HTML element. For example, the "variation" prop is used to generate
     * the classNames, but doesn't need passed to the rendered component, so we
     * omit it here so that it's not included in the props object.
     */
    const { component, onClick, ...props } = this.props;

    const attrs = {
      ...props
    };

    if (this.props.onClick) {
      attrs.onClick = this.handleClick.bind(this);
    }

    return attrs;
  }

  handleClick(e) {
    if (!this.props.disabled) {
      this.props.onClick(e);
    }
  }

  render() {
    const attrs = this.attrs();
    let componentType = 'button';

    if (this.props.component) {
      componentType = this.props.component;
    } else if (this.props.href) {
      componentType = 'a';
      // Remove <button> specific attributes
      delete attrs.disabled;
      delete attrs.type;
    }

    const StyledComponent = generateStyledComponent(componentType);
    return <StyledComponent {...attrs}>{this.props.children}</StyledComponent>;
  }
}

Button.defaultProps = { type: 'button' };
Button.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  disabled: PropTypes.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: PropTypes.string,
  /** Applies the inverse theme styling */
  inverse: PropTypes.bool,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes (`primary`, `danger`, `success`, `transparent`)
   */
  variation: PropTypes.string
};

export default Button;
