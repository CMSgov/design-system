import { stepListStepData } from './__mocks__/stepListStepData';
import { StepList as StepListComponent } from './StepList';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StepListComponent> = {
  title: 'Components/StepList',
  component: StepListComponent,
};
export default meta;

type Story = StoryObj<typeof StepListComponent>;

export const StepListExample: Story = {
  args: {
    steps: stepListStepData,
  },
};
