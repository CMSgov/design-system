import * as React from 'react';

export interface UsaBannerProps {
  /**
   * Passing `es-US` as a value will render USA Banner in Spanish.
   */
  locale?: string,
}

export default class UsaBanner extends React.Component<UsaBannerProps, any> {
  render(): JSX.Element;
}
