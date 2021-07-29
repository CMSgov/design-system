/* eslint-disable */
import React from 'react';

// See https://github.com/downshift-js/downshift#getrootprops
// Custom container returns a plain div, without the ARIA markup
// required for a WAI-ARIA 1.1 combobox. See the comments at the
// top of the component file for an explanation of this decision.
const WrapperDiv = ({ innerRef, ...rest }) => <div ref={innerRef} {...rest} />;

export default WrapperDiv;
