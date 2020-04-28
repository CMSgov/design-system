import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';
import classNames from 'classnames';

// Mock react-router example
const Link = ({ className, ...props }) => (
  // <Link to={props.href} {...props}>{props.children}</Link>
  <a className={classNames(className, 'special-link')} {...props}>
    {props.children}
  </a>
);
Link.propTypes = { children: PropTypes.node };

ReactDOM.render(
  <div style={{ maxWidth: '628px' }}>
    <StepList
      completedText="Completed"
      editText="Edit"
      resumeText="Resume"
      startText="Start"
      steps={[
        {
          id: 'taxYear',
          heading: 'Choose a tax year',
          href: '#step-1',
          started: true,
          completed: true
        },
        {
          id: 'household',
          heading: 'Enter household details',
          description:
            'Answer questions about who in your household qualifies for a premium tax credit and information on each person, including date of birth, location(s) they lived in for the year, and months of marketplace coverage.',
          href: '#step-2',
          started: true,
          completed: false,
          component: Link,
          steps: [
            {
              id: 'household.overall',
              heading: 'Overall household',
              href: '#step-2a',
              started: true,
              completed: true
            },
            {
              id: 'household.bob',
              heading: "Bob's information",
              href: '#step-2b',
              started: false,
              completed: false
            },
            {
              id: 'household.barb',
              heading: "Barb's information",
              href: '#step-2c',
              started: false,
              completed: false
            }
          ]
        },
        {
          id: 'review',
          heading: 'Review your information',
          href: '#step-3',
          started: false,
          completed: false
        },
        {
          id: 'finish',
          heading: 'View premium results',
          href: '#step-4',
          started: false,
          completed: false
        }
      ]}
    />
  </div>,
  document.getElementById('js-example')
);
