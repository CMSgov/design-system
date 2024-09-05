const serializeSteps = (steps) => JSON.stringify(steps);

export const serializedSteps = serializeSteps([
  {
    id: 'taxYear',
    heading: 'Choose a tax year',
    href: '#step-1',
    started: true,
    completed: true,
    description: 'Select the tax year for which you are filing.',
  },
  {
    id: 'household',
    heading: 'Enter household details',
    href: '#step-2',
    started: true,
    completed: false,
    description: 'Provide details about everyone in your household.',
    steps: [
      {
        id: 'household.overall',
        heading: 'Overall household',
        href: '#step-2a',
        started: true,
        completed: true,
      },
      {
        id: 'household.bob',
        heading: "Bob's information",
        href: '#step-2b',
        started: false,
        completed: false,
      },
    ],
  },
  {
    id: 'review',
    heading: 'Review your information',
    href: '#step-3',
    started: false,
    completed: false,
  },
  {
    id: 'finish',
    heading: 'View premium results',
    href: '#step-4',
    started: false,
    completed: false,
  },
]);
