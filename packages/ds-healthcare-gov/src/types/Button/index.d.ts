import React from 'react';
import { ButtonVariation, ButtonProps as CoreButtonProps } from '@cmsgov/design-system';

type ButtonProps = CoreButtonProps & {
  variation?: ButtonVariation | 'secondary';
};

// eslint-disable-next-line react/prefer-stateless-function
export declare class Button extends React.PureComponent<ButtonProps> {
  render(): JSX.Element;
}
