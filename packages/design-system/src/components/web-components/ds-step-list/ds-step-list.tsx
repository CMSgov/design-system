import { define } from '../preactement/define';
import { StepListProps } from '../../StepList/StepList';
import { StepList } from '../../StepList';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'steps',
  'show-sub-sub-steps',
  'completed-text',
  'edit-text',
  'resume-text',
  'start-text',
  'actions-label-text',
  'substeps-label-text',
];

interface WrapperProps extends Omit<StepListProps, 'steps' | 'showSubSubSteps'> {
  steps: string;
  showSubSubSteps?: string;
}

const Wrapper = ({
  steps = '[]',
  showSubSubSteps,
  completedText,
  editText,
  resumeText,
  startText,
  actionsLabelText,
  substepsLabelText,
  ...otherProps
}: WrapperProps) => (
  <StepList
    steps={JSON.parse(steps)}
    showSubSubSteps={parseBooleanAttr(showSubSubSteps)}
    completedText={completedText}
    editText={editText}
    resumeText={resumeText}
    startText={startText}
    actionsLabelText={actionsLabelText}
    substepsLabelText={substepsLabelText}
    {...otherProps}
  />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-step-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

define('ds-step-list', () => Wrapper, { attributes });
