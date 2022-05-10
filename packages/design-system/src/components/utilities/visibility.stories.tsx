import React from 'react';

export default {
  title: 'Utilities/Visibility',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive layout grid -- referenced in doc site
export const visibility = () => (
  <div>
    {['sm', 'md', 'lg', 'xl'].map((breakpoint) => (
      <div className="ds-u-padding--1 ds-u-border--1" key={breakpoint}>
        <div className={`ds-u-{breakpoint}-visibility--hidden ds-u-color--muted`}>
          Hidden on {breakpoint} screens and larger
        </div>
        <div className={`ds-u-${breakpoint}-visibility--visible`}>
          Visible on {breakpoint} screens and larger
        </div>
      </div>
    ))}
  </div>
);
