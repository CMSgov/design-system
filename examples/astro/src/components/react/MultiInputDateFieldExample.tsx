import { MultiInputDateField } from '@cmsgov/design-system';

function MultiInputDateFieldExample() {
  return (
    <>
      <h2>MultiInputDateField Example</h2>
      <MultiInputDateField
        label="Date of birth"
        errorMessage="Please enter a year in the past"
        monthDefaultValue="10"
        dayDefaultValue="31"
        yearDefaultValue="2050"
        yearInvalid
      />
    </>
  );
}

export default MultiInputDateFieldExample;
