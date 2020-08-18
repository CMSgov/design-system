import * as React from 'react';

export interface StepListSteps {
    id?: string;
    href: string;
    title?: string;
    heading: string;
    headingLevel?: "1" | "2" | "3" | "4" | "5";
    description?: string;
    linkText?: string;
    completed?: boolean;
    started?: boolean;
    isNextStep?: boolean;
    onClick?: (...args: any[])=>any;
    component?: React.ReactElement<any> | ((...args: any[])=>any);
}

export type StepListComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

export interface StepListProps {
    /**
     * An array of step objects that contain information needed to render
     * them like text, state, and link/button URLs.
     * See [Start, Resume, and Edit links]({{root}}/patterns/step-list/#patterns.step-list.buttons)
     * and [Step object]({{root}}/patterns/step-list/#patterns.step-list.step-object)
     */
    steps: StepListSteps[];
    /**
     * When provided, this will render the passed in component for all link elements. This is useful when
     * integrating with React Router's `<Link>` or using your own custom component.
     * If more specific control is needed, each `step` object also accepts a `component` prop.
     */
    component?: StepListComponent;
    /**
     * Whether or not to render a substep's substeps.
     */
    showSubSubSteps?: boolean;
    /**
     * Function called when a step's Edit, Start, or Resume button/link is
     * clicked. The step's `href` property will be passed as a parameter.
     */
    onStepLinkClick?: (...args: any[])=>any;
    completedText: string;
    editText: string;
    resumeText: string;
    startText: string;
    /**
     * A template string for the aria-label describing a step's actions where
     * the substring `%{step}` is replaced with that step's `heading`.
     */
    actionsLabelText?: string;
    /**
     * A template string for the aria-label for a step's description where
     * the substring `%{step}` is replaced with that step's `heading`.
     */
    descriptionLabelText?: string;
    /**
     * A template string for the aria-label describing a step's substeps where
     * the substring `%{step}` is replaced with that step's `heading`.
     */
    substepsLabelText?: string;
}

declare const StepList: React.FC<StepListProps>;

export default StepList;

