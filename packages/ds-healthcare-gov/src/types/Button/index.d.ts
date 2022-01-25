import React from 'react';
import {
  ButtonVariation,
  ButtonProps as CoreButtonProps,
  ButtonComponentType,
} from '@cmsgov/design-system';

type ButtonProps<T extends ButtonComponentType> = Omit<CoreButtonProps<T>, 'variation'> & {
  variation?: ButtonVariation | 'secondary';
};

export declare const Button: <T extends ButtonComponentType>(props: ButtonProps<T>) => JSX.Element;
