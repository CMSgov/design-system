// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-tab-panel': JSX.IntrinsicElements['div'] & {
        id: string;
        'class-name'?: string;
        selected?: string;
        disabled?: string;
        tab: string;
        'tab-class-name'?: string;
        'tab-href'?: string;
        'tab-id'?: string;
      };
    }
  }
}
