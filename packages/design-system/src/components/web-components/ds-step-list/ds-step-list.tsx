import { define } from '../preactement/define';
import { StepListProps } from '../../StepList/StepList';
import { StepList } from '../../StepList';
import { parseBooleanAttr } from '../wrapperUtils';

/*
Todos:
  1. Verify the handling of the `component` attribute.
  2. Verify the handling of `onStepLinkClick`.
  3. Ensure full test coverage in `ds-step-list.tests.tsx`.
*/

const attributes = [
  'steps',
  /*
    The component prop in our React component is used to render a specific React component 
    for all link elements when provided.
    */
  // 'component', // StepLinkProps['component']
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
  steps,
  showSubSubSteps,
  completedText,
  editText,
  resumeText,
  startText,
  actionsLabelText,
  substepsLabelText,
  ...otherProps
}: WrapperProps) => {
  // console.log('steps', steps)
  const parsedShowSubSubSteps = parseBooleanAttr(showSubSubSteps);

  return (
    <StepList
      steps={typeof steps === 'string' ? JSON.parse(steps) : steps}
      showSubSubSteps={parsedShowSubSubSteps}
      completedText={completedText}
      editText={editText}
      resumeText={resumeText}
      startText={startText}
      actionsLabelText={actionsLabelText}
      substepsLabelText={substepsLabelText}
      {...otherProps}
    />
  );
};

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

define('ds-step-list', () => Wrapper, {
  attributes,
  events: [
    [
      'onStepLinkClick',
      (href?: string, stepId?: string) => ({
        detail: { href, stepId },
      }),
    ],
  ],
});
