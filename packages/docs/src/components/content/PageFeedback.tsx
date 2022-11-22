import React from 'react';
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
 * Asks a feedback question to the user and reports the answer to New Relic
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

  // Use a consistent line-height between alerts so we don't get a content shift
  const lineHeight = '40px';

  const stateAlertProps = answered
    ? {
        variation: 'success' as const,
        style: {
          // Don't have the feedback span the whole width
          display: 'inline-block',
          lineHeight,
        },
      }
    : {
        weight: 'lightweight' as const,
        style: { lineHeight },
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
