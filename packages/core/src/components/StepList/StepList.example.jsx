/* eslint-disable react/display-name */
import React from 'react';
import StepList from './StepList';

export default function() {
  return (
    <div style={{ maxWidth: '628px' }}>
      <StepList
        completedText="Completed"
        editText="Edit"
        resumeText="Resume"
        startText="Start"
        onEnterStep={() => {}}
        steps={[
          {
            id: 'taxYear',
            title: 'Choose a tax year',
            route: '#step-1',
            started: true,
            completed: true
          },
          {
            id: 'household',
            title: 'Enter household details',
            description:
              'Answer questions about who in your household qualifies for a premium tax credit and information on each person, including date of birth, location(s) they lived in for the year, and months of marketplace coverage.',
            route: '#step-2',
            started: true,
            completed: false,
            steps: [
              {
                id: 'household.overall',
                title: 'Overall household',
                route: '#step-2a',
                started: true,
                completed: true
              },
              {
                id: 'household.bob',
                title: "Bob's information",
                route: '#step-2b',
                started: false,
                completed: false
              },
              {
                id: 'household.barb',
                title: "Barb's information",
                route: '#step-2c',
                started: false,
                completed: false
              }
            ]
          },
          {
            id: 'review',
            title: 'Review your information',
            route: '#step-3',
            started: false,
            completed: false
          },
          {
            id: 'finish',
            title: 'View premium results',
            route: '#step-4',
            started: false,
            completed: false
          }
        ]}
      />
    </div>
  );
}
