import React from 'react';
export interface WrapperDivProps {
  innerRef: React.RefObject<HTMLDivElement>;
  [additional_props: string]: unknown;
}
// See https://github.com/downshift-js/downshift#getrootprops
// Custom container returns a plain div, without the ARIA markup
// required for a WAI-ARIA 1.1 combobox. See the comments at the
// top of the component file for an explanation of this decision.
const WrapperDiv: React.FunctionComponent<WrapperDivProps> = ({
  innerRef,
  ...rest
}: WrapperDivProps) => <div ref={innerRef} {...rest} />;

export default WrapperDiv;
