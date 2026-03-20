import Alert from './Alert';
import figma from '@figma/code-connect';

// Original branch
// "https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=56%3A4727"
figma.connect(
  Alert,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/EY3W2duP5LJfOrHYdEU0ps/Design-System-Library?m=auto&node-id=56-4727&t=NzUAuvg76hM0oNJF-1',
  {
    props: {
      children: figma.boolean('Has body text', {
        true: figma.string('Alert body text'),
        false: undefined,
      }),
      heading: figma.boolean('Has title', {
        true: figma.string('Alert Title'),
        false: undefined,
      }),
      hideIcon: figma.boolean('Has icon'),
      variation: figma.enum('Alert Type', {
        Info: undefined,
        Success: 'success',
        Warning: 'warn',
        Error: 'error',
      }),
      weight: figma.boolean('Lightweight', {
        true: 'lightweight',
        false: undefined,
      }),
    },
    example: (props) => <Alert {...props} />,
  }
);
