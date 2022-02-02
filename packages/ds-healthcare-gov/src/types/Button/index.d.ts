import React from 'react';
import { ButtonVariation, ButtonProps as CoreButtonProps } from '@cmsgov/design-system';

type ButtonProps = Omit<CoreButtonProps, 'variation'> & {
  variation?: ButtonVariation | 'secondary';
};

export declare const Button: (props: ButtonProps) => JSX.Element;
