// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import {
  Alert,
  Button,
  Drawer,
  MultiInputDateField,
  TextField,
  UsaBanner,
} from '@cmsgov/design-system';
import { useState } from 'react';
import ReactDOM from 'react-dom';

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

  const validateInput = (type) => {
    setTouched(true);
    const yearNum = parseInt(formData?.birthdate.year, 10);
    const newErrors = { ...errors };

    switch (type) {
      case 'username':
        formData.username.length < 5
          ? (newErrors.username = 'Username must be at least 5 characters')
          : (newErrors.username = '');
        break;
      case 'password':
        formData.password.length < 6
          ? (newErrors.password = 'Password must be at least 6 characters')
          : (newErrors.password = '');
        break;
      case 'year':
        !yearNum || yearNum >= new Date().getFullYear()
          ? (newErrors.birthdate = 'Please enter a year in the past')
          : (newErrors.birthdate = '');
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form Example</h2>

      <TextField
        name="username"
        label="Username"
        hint="Your username can only include letters in the American-English alphabet."
        required
        minlength={5}
        maxlength={100}
        pattern="^[A-Za-z]+$"
        defaultValue={formData.username}
        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
        onBlur={() => validateInput('username')}
        errorMessage={touched ? errors.username : ''}
        errorPlacement="bottom"
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        required
        minlength={6}
        defaultValue={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        onBlur={() => validateInput('password')}
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
        onBlur={() => validateInput('year')}
        dayInvalid={!!errors.birthdate}
        monthInvalid={!!errors.birthdate}
        yearInvalid={!!errors.birthdate}
      />

      <div className="ds-u-margin-top--2">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

const ExampleInstantValidationForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const validateUsername = () => {
    if (username.length < 5) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <h2>Instant Validation Example</h2>
      <p>
        Because of the way VoiceOver works (or does not), we need to test{' '}
        <a href="https://design.cms.gov/patterns/Forms/error-validation/#instant-validation">
          instant validation
        </a>{' '}
        in the following manner:
      </p>
      <ol>
        <li>Have your screen reader of choice going (likely VoiceOver)</li>
        <li>Tab to the input to focus it</li>
        <li>Enter text that does not meet the requirement</li>
        <li>Tab to the next element</li>
        <li>
          Observe the alert being fired audibly. VoiceOver should read out the alert{' '}
          <code>onBlur</code>
        </li>
      </ol>
      <p>
        Note: there is no other focusable element after the TextField because VoiceOver will hide
        any alert and just announce the content in the next focusable element instead of the alert.
      </p>

      <TextField
        name="username"
        label="Username"
        requirementLabel="Required."
        hint="Must be at least 5 characters long."
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={validateUsername}
        errorMessage={error ? 'Username must be longer.' : ''}
        errorPlacement="bottom"
      />
    </>
  );
};

const Example = function () {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <UsaBanner />
      <header className="ds-base--inverse ds-u-padding-y--3">
        <div className="ds-l-container">
          <span className="ds-text-heading--xl">ExampleWebsite.gov</span>
        </div>
      </header>

      <div className="ds-l-container ds-u-padding-top--2">
        <div className="ds-u-measure--base">
          <h1 className="ds-text-heading--3xl">React-app example</h1>
          <Alert heading="Hello world">
            <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
            <Drawer
              footerTitle="Footer Title"
              footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
              heading="Drawer Heading"
              isOpen={open}
              onCloseClick={() => setOpen(false)}
              hasFocusTrap={true}
            >
              Test
            </Drawer>
            <Button onClick={() => setOpen(true)} className="ds-u-margin-top--2">
              Learn more
            </Button>
          </Alert>
        </div>
        <ExampleForm />
        <ExampleInstantValidationForm />
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
