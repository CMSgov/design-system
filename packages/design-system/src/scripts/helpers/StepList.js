// Helper functions for StepList tests

const defaultStep = {
  id: '123',
  complete: false,
  started: false,
  isNextStep: false,
  href: '/some/path',
  heading: 'Do something!',
  description: 'Do something really cool!',
};

const generateStep = (step) => ({
  ...defaultStep,
  ...step,
});

module.exports = { defaultStep, generateStep };
