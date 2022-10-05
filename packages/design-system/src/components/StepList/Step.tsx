import StepLink, { StepLinkProps } from './StepLink';
import SubStep from './SubStep';
import classNames from 'classnames';
import { CheckIcon } from '../Icons';
import uniqueId from 'lodash/uniqueId';

type HeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface StepObject {
  id?: string;
  href: string;
  heading: string;
  headingLevel?: HeadingLevel;
  description?: string;
  linkText?: string;
  completed?: boolean;
  started?: boolean;
  isNextStep?: boolean;
  onClick?: StepLinkProps['onClick'];
  component?: StepLinkProps['component'];
  steps?: StepObject[];
}

export interface StepProps {
  step: StepObject;
  onStepLinkClick?: StepLinkProps['onClick'];
  showSubSubSteps?: boolean;
  completedText: string;
  editText: string;
  resumeText: string;
  startText: string;
  actionsLabelText: string;
  descriptionLabelText: string;
  substepsLabelText: string;
}

export const Step = ({ step, ...props }: StepProps) => {
  const getAriaLabel = (text) => {
    const isValidTemplate = text && text.length > 0;
    const label = isValidTemplate ? text.replace('%{step}', step.heading) : undefined;
    return { 'aria-label': label };
  };
  const Heading = `h${step.headingLevel || '2'}` as const;
  const start = step.isNextStep;
  const resume = step.started && !step.completed;
  const className = classNames('ds-c-step', {
    'ds-c-step--current': start || resume,
    'ds-c-step--completed': step.completed,
  });
  const contentClassName = classNames('ds-c-step__content', {
    'ds-c-step__content--with-content': step.description || step.steps,
  });
  const { actionsLabelText, substepsLabelText, descriptionLabelText } = props;
  const actionsLabel = getAriaLabel(actionsLabelText);
  const substepsLabel = getAriaLabel(substepsLabelText);
  const descriptionLabel = getAriaLabel(descriptionLabelText);
  const descriptionHeadingID = uniqueId('heading-');

  let linkLabel;
  if (step.completed && !step.steps) {
    linkLabel = step.linkText || props.editText;
  } else if (start) {
    linkLabel = step.linkText || props.startText;
  } else if (resume) {
    linkLabel = step.linkText || props.resumeText;
  }

  let linkClassName;
  if (start || resume) {
    linkClassName = 'ds-c-button ds-c-button--solid ds-c-button--main ds-c-button--on-light';
  }

  // TODO: make heading required after removing title
  return (
    <li className={className}>
      <div className={contentClassName}>
        <Heading id={descriptionHeadingID} className="ds-c-step__heading" {...descriptionLabel}>
          {step.heading}
        </Heading>
        {step.description && (
          <div
            className="ds-c-step__description"
            aria-labelledby={descriptionHeadingID}
            role="region"
          >
            {step.description}
          </div>
        )}
        {step.steps && (
          <ol className="ds-c-step__substeps" {...substepsLabel}>
            {step.steps.map((s, i) => (
              <SubStep
                step={{ ...s, ...{ component: step.component || s.component } }}
                key={s.id || i}
                {...props}
              />
            ))}
          </ol>
        )}
      </div>
      <div className="ds-c-step__actions" {...actionsLabel} role="region">
        {step.completed && (
          <div className="ds-c-step__completed-text">
            <CheckIcon className="ds-c-icon-color--success" />
            {props.completedText}
          </div>
        )}
        {linkLabel && (
          <StepLink
            component={step.component}
            href={step.href}
            stepId={step.id}
            screenReaderText={step.heading}
            onClick={step.onClick || props.onStepLinkClick}
            className={linkClassName}
          >
            {linkLabel}
          </StepLink>
        )}
      </div>
    </li>
  );
};

export default Step;
