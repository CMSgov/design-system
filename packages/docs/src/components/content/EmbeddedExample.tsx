import type * as React from 'react';
import ExampleFooter from './ExampleFooter';

interface EmbeddedExampleProps {
  children: React.ReactElement;
}

/**
 * Shows a code example
 */
const EmbeddedExample = ({ children }: EmbeddedExampleProps) => (
  <section className="c-embedded-example">
    <div className="ds-u-border--1 ds-u-padding--2">{children}</div>
    <ExampleFooter />
  </section>
);

export default EmbeddedExample;
