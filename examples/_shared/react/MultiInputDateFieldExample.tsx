import { MultiInputDateField, Button } from '@cmsgov/design-system';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting date:', date);
  };

  return (
    <>
      <h2>MultiInputDateField inside a form</h2>
      <form onSubmit={handleSubmit} aria-label="something">
        <MultiInputDateField
          label={touched ? '*Your birthdate' : 'Date of birth'}
          hint="For example: 10/31/1965"
          monthLabel={touched ? '*Month' : 'Month'}
          dayLabel={touched ? '*Day' : 'Day'}
          yearLabel={touched ? '*Year' : 'Year'}
          errorMessage={touched ? errors.year : ''}
          errorPlacement="bottom"
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
        <div className="ds-u-margin-top--2">
          <Button>Form Submit</Button>
        </div>
      </form>
    </>
  );
}

export default MultiInputDateFieldExample;
