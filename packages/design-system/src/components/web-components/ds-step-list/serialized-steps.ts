import { stepListStepData } from '../../StepList/StepList.stories';

const serializeSteps = (steps) => JSON.stringify(steps);
export const serializedSteps = serializeSteps(stepListStepData);
