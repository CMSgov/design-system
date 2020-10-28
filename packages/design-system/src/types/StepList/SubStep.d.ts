import * as React from 'react';
import { StepObject } from './Step';

export interface SubStepProps {
  step: StepObject;
  onStepLinkClick?: (...args: any[]) => any;
  showSubSubSteps?: boolean;
  editText: string;
}

declare const SubStep: React.FC<SubStepProps>;

export default SubStep;
