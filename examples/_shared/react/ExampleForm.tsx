import { TextField, MultiInputDateField, Button } from '@cmsgov/design-system';
import React, { useState } from 'react';

function ExampleForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    birthdate: { day: '', month: '', year: '' },
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    birthdate: '',
  });

  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    const newErrors: typeof errors = { username: '', password: '', birthdate: '' };

    if (formData.username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    const yearNum = parseInt(formData.birthdate.year, 10);
    if (!yearNum || yearNum >= new Date().getFullYear()) {
      newErrors.birthdate = 'Please enter a year in the past';
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Example Form</h2>

      <TextField
        name="username"
        label="Username"
        defaultValue={formData.username}
        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
        onBlur={handleBlur}
        errorMessage={touched ? errors.username : ''}
        errorPlacement="bottom"
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        defaultValue={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        onBlur={handleBlur}
        errorMessage={touched ? errors.password : ''}
        errorPlacement="bottom"
      />

      <MultiInputDateField
        label="Date of Birth"
        hint="For example: 10/31/1965"
        monthLabel="Month"
        dayLabel="Day"
        yearLabel="Year"
        errorMessage={touched ? errors.birthdate : ''}
        errorPlacement="bottom"
        monthValue={formData.birthdate.month}
        dayValue={formData.birthdate.day}
        yearValue={formData.birthdate.year}
        onChange={(event, dateObject) =>
          setFormData((prev) => ({ ...prev, birthdate: dateObject }))
        }
        onComponentBlur={handleBlur}
        dayInvalid={!!errors.birthdate}
        monthInvalid={!!errors.birthdate}
        yearInvalid={!!errors.birthdate}
      />

      <div className="ds-u-margin-top--2">
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default ExampleForm;
