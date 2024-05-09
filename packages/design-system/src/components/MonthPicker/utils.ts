import { ReactNode } from 'react';
import { findElementsOfType } from '../utilities/findElementsOfType';

export function parseChildren(node: ReactNode):
  | {
      selectedMonths: number[];
      disabledMonths: number[];
    }
  | undefined {
  const elements = findElementsOfType(['input'], node);
  if (elements.length) {
    const selectedMonths = [];
    const disabledMonths = [];
    for (const element of elements) {
      const attrs = element.props;

      const monthNumber = parseInt(attrs.value);
      if (monthNumber < 1 || monthNumber > 12) {
        throw new Error('Each month input needs a value from 1 to 12.');
      }

      if (attrs.checked !== undefined) selectedMonths.push(monthNumber);
      if (attrs.disabled !== undefined) disabledMonths.push(monthNumber);
    }

    return {
      selectedMonths,
      disabledMonths,
    };
  }
}
