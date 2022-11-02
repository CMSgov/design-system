import { Alert, Button } from '@cmsgov/design-system';
import { useState } from 'react';

declare global {
  interface Window {
    newrelic: {
      interaction: any;
    };
  }
}

export interface PageFeedbackProps {
  question: string;
}

/**
 *
 */
const PageFeedback = ({ question = 'Was this article helpful?' }: PageFeedbackProps) => {
  const [answered, setAnswered] = useState(false);

  function handleClick(helpful: boolean) {
    window.newrelic
      .interaction()
      .actionText('Feedback')
      .setAttribute('helpful', helpful ? 'yes' : 'no')
      .save();
    setAnswered(true);
  }

  const stateAlertProps = answered
    ? {
        variation: 'success',
        style: { display: 'inline-block' },
      }
    : {
        weight: 'lightweight',
      };

  return (
    <Alert {...stateAlertProps} hideIcon className="ds-u-margin-top--4">
      {answered ? (
        <>Thank you for your feedback!</>
      ) : (
        <>
          {question}
          <Button className="ds-u-margin-left--2" onClick={() => handleClick(true)}>
            Yes
          </Button>
          <Button className="ds-u-margin-left--1" onClick={() => handleClick(false)}>
            No
          </Button>
        </>
      )}
    </Alert>
  );
};

export default PageFeedback;

// window.newrelic.interaction().actionText('Liked the article').setAttribute('helpful', 'no').save()
