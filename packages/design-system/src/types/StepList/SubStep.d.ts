import * as React from 'react';

export interface SubStepStep {
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

export interface SubStepProps {
    step: SubStepStep;
    onStepLinkClick?: (...args: any[])=>any;
    showSubSubSteps?: boolean;
    editText: string;
}

declare const SubStep: React.FC<SubStepProps>;

export default SubStep;

