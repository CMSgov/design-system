import * as React from 'react';

export type MaskMask = 'currency' | 'phone' | 'ssn' | 'zip';

export interface MaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  mask?: MaskMask;
}

export default class Mask extends React.Component<MaskProps, any> {
  render(): JSX.Element;
}

export function maskValue(value: string, mask: any): string;

export function unmaskValue(value: string, mask: string): string;
