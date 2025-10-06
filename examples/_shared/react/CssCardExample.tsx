import { FunctionComponent } from 'react';

interface CardProps {
  className?: string;
}

export const CssCardExample: FunctionComponent<CardProps> = ({ className = 'ds-c-card' }) => {
  return (
    <>
      <h2>CSS Card Example</h2>
      <div className={`${className} ds-u-padding--2`}>
        It was the best of times, it was the worst of times, it was the age of wisdom, it was the
        age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the
        season of Light, it was the season of Darkness, it was the spring of hope, it was the winter
        of despair...
      </div>
    </>
  );
};

export default CssCardExample;
