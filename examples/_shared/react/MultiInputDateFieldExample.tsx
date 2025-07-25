import { MultiInputDateField } from '@cmsgov/design-system';
import { useState } from 'react';

function MultiInputDateFieldExample() {
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({ year: '' });

  const handleBlur = () => {
    setTouched(true);
    const yearNum = parseInt(date.year, 10);
    if (!yearNum || yearNum >= new Date().getFullYear()) {
      setErrors({ year: 'Please enter a year in the past' });
    } else {
      setErrors({ year: '' });
    }
  };

  return (
    <>
      <h2>Trigger Label Re-render Example</h2>
      <MultiInputDateField
        label={touched ? <strong>Date of birth in strong</strong> : 'Date of birth'}
        hint="For example: 10/31/1965"
        monthLabel={touched ? <span className="dynamic-label">After</span> : 'Before'}
        dayLabel="Day"
        yearLabel="Year"
        errorMessage={touched ? errors.year : ''}
        monthValue={date.month}
        dayValue={date.day}
        yearValue={date.year}
        onChange={(event, dateObject) => {
          setDate(dateObject);
        }}
        onComponentBlur={handleBlur}
        dayInvalid={!!errors.year}
        monthInvalid={!!errors.year}
        yearInvalid={!!errors.year}
      />
    </>
  );
}

export default MultiInputDateFieldExample;
