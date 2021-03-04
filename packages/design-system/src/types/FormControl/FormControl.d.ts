import React from 'react';
interface FormControlRenderProps {
    id: string;
    labelId: string;
    errorId: string;
    setRef: (elem: HTMLDivElement) => void;
}
interface FormControlProps {
    /**
     * Additional classes to be added to the field container.
     */
    className?: string;
    /**
     * The HTML element used to render the container
     */
    component: 'div' | 'fieldset';
    /**
     * A unique ID to be used for the error message. If one isn't provided, a unique ID will be generated.
     */
    errorId?: string;
    errorMessage?: React.ReactNode;
    /**
     * Additional classes to be added to the error message
     */
    errorMessageClassName?: string;
    /**
     * Location of the error message relative to the field input
     */
    errorPlacement: 'top' | 'bottom';
    /**
     * Used to focus the field input on `componentDidMount()`
     */
    focusTrigger?: boolean;
    /**
     * Additional hint text to display
     */
    hint?: React.ReactNode;
    /**
     * A unique ID to be used for the field input. If one isn't provided, a unique ID will be generated.
     */
    id?: string;
    /**
     * Access a reference to the field input
     */
    inputRef?: (elem: HTMLDivElement) => void;
    /**
     * Applies the "inverse" UI theme
     */
    inversed?: boolean;
    /**
     * Label for the field.
     */
    label: React.ReactNode;
    /**
     * Additional classes to be added to the field label
     */
    labelClassName?: string;
    /**
     * The root HTML element used to render the field label
     */
    labelComponent: 'label' | 'legend';
    /**
     * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
     */
    labelId?: string;
    /**
     * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
     */
    requirementLabel?: React.ReactNode;
    /**
     * A function that returns a field input element to accept render props
     */
    render: (renderProps: FormControlRenderProps) => React.ReactNode;
}
export declare class FormControl extends React.Component<FormControlProps> {
    constructor(props: FormControlProps);
    componentDidMount(): void;
    id: string;
    labelId: string;
    errorId: string;
    inputRef?: HTMLDivElement;
    setRef(elem: HTMLDivElement): void;
    render(): React.ReactNode;
}
export declare const FormControlPropKeys: string[];
export default FormControl;
