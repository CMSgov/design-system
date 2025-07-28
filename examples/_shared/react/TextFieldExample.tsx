import { useState } from 'react';
import { TextField, Button } from '@cmsgov/design-system';

function TextFieldExample() {
  const [value, setValue] = useState('Example value');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const handleBlur = () => {
    setTouched(true);
    if (value.length < 5) {
      setError('Input must be at least 5 characters');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting value:', value);
  };

  return (
    <section>
      <div className="ds-l-container">
        <h2>Deeply Nested TextField Example</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="ds-c-fieldset">
            <legend className="ds-c-label">User Info</legend>
            <div className="ds-l-row">
              <div className="ds-l-col--6">
                <div className="ds-c-field">
                  <div className="ds-c-wrapper">
                    <TextField
                      label={touched ? '*Single line field' : 'Single line field'}
                      defaultValue={value}
                      onBlur={handleBlur}
                      onChange={(e) => setValue(e.target.value)}
                      name="single_example"
                      errorMessage={touched ? error : ''}
                      labelClassName="ds-u-margin-top--0"
                      errorPlacement="bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="ds-u-margin-top--2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default TextFieldExample;
