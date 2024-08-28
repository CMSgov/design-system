import { define } from '../preactement/define';
import { StepListProps } from '../../StepList/StepList';
import { StepList } from '../../StepList';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';

const attributes = [
  'steps',
  /*
    The component prop in our React component is used to render a specific React component 
    for all link elements when provided.
    */
  // 'component', // StepLinkProps['component']
  'show-sub-sub-steps',
  // 'on-step-link-click', // StepLinkProps['onClick']
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
}: WrapperProps) => {
  const parsedSteps = parseJsonAttr(steps);
  const parsedShowSubSubSteps = parseBooleanAttr(showSubSubSteps);

  return (
    <StepList
      steps={parsedSteps}
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

define('ds-step-list', () => Wrapper, { attributes, events: [] });
