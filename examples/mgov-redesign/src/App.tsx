import { useState } from 'react';
import type { ReactNode } from 'react';
import { InfoCircleIcon, StarIcon } from '@cmsgov/design-system';
import { Alert } from './components/Alert';
import { Banner } from './components/Banner';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Button } from './components/Button';
import { ChoiceBlock } from './components/ChoiceBlock';
import { Dialog } from './components/Dialog';
import { Dropdown } from './components/Dropdown';
import { FeatureCard } from './components/FeatureCard';
import { Pill } from './components/Pill';
import { Search } from './components/Search';
import { TextField } from './components/TextField';
import { Tile } from './components/Tile';
import { Tooltip } from './components/Tooltip';

const APP_LIBRARY_TITLE = "Take control of your health data with Medicare's app library";
const APP_LIBRARY_BODY =
  'Find secure third-party apps to track your health history, manage medications, share information with providers, and more.';

function VariantGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="variant-group">
      <p className="variant-label">{label}</p>
      {children}
    </div>
  );
}

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section className="ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-col--12 ds-l-md-col--6">
            <VariantGroup label="feature-card--small">
              <FeatureCard
                variant="small"
                title={APP_LIBRARY_TITLE}
                body={APP_LIBRARY_BODY}
                ctaLabel="How to report fraud"
              />
            </VariantGroup>
          </div>

          <div className="ds-l-col--12 ds-l-md-col--6">
            <VariantGroup label="feature-card--large">
              <FeatureCard
                variant="large"
                title="Already know the type of coverage you want?"
                body="We'll ask you about your needs and priorities, and then show you plans that might be a good fit."
                ctaLabel="Guide me to a plan"
              />
            </VariantGroup>
          </div>
        </div>
      </section>

      <VariantGroup label="typography (type scale)">
        <div className="ds-u-display--flex ds-u-flex-direction--column">
          <span className="ds-c-mgov-type--display-xl ds-u-margin-bottom--1">
            Display/XL — Medicare, made simple.
          </span>
          <span className="ds-c-mgov-type--display-lg ds-u-margin-bottom--1">
            Display/Lg — Medicare, made simple.
          </span>
          <span className="ds-c-mgov-type--section-title ds-u-margin-bottom--1">
            Section Title — What can we help you with?
          </span>
          <span className="ds-c-mgov-type--featured-title ds-u-margin-bottom--1">
            Featured Title — What&apos;s new for 2026
          </span>
          <span className="ds-c-mgov-type--pair-title ds-u-margin-bottom--1">
            Pair Title — Find care near you
          </span>
          <span className="ds-c-mgov-type--action-title ds-u-margin-bottom--1">
            Action Title — Find your account
          </span>
          <span className="ds-c-mgov-type--notice-title ds-u-margin-bottom--1">
            Notice Title — Open Enrollment ends Dec 7
          </span>
          <span className="ds-c-mgov-type--lede ds-u-margin-bottom--1">
            Lede — Find a plan, sign in, or get answers.
          </span>
          <span className="ds-c-mgov-type--body ds-u-margin-bottom--1">
            Body — Medicare is health insurance for people 65 or older.
          </span>
          <span className="ds-c-mgov-type--body-small ds-u-margin-bottom--1">
            Body Small — Sign in to view your plan and claims.
          </span>
          <span className="ds-c-mgov-type--text-link ds-u-margin-bottom--1">
            Text Link — Browse plans in your area →
          </span>
          <span className="ds-c-mgov-type--button">Button — Find a Plan</span>
        </div>
      </VariantGroup>

      <VariantGroup label="tile--small">
        <Tile size="small" label="New to Medicare" icon={<StarIcon />} />
      </VariantGroup>

      <VariantGroup label="tile--large">
        <Tile size="large" label="New to Medicare" icon={<InfoCircleIcon />} />
      </VariantGroup>

      <VariantGroup label="banner--feature">
        <Banner
          variant="feature"
          heading={
            <>
              Easier, secure Medicare
              <br />
              account options
            </>
          }
          body="You can now create or log in to your Medicare account using ID.me, CLEAR®, or Login.gov. These free, secure services verify your identity and help us prevent fraud."
          buttonLabel="Create/connect your account"
          imageSrc={''}
          imageAlt="A couple reviewing Medicare options together"
        />
      </VariantGroup>

      <VariantGroup label="banner--simple">
        <Banner
          variant="simple"
          heading="First time joining a Medicare health or drug plan?"
          body="Find out if you're ready to join"
          buttonLabel="Answer a few questions"
        />
      </VariantGroup>

      <VariantGroup label="breadcrumbs (two)">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Get started', href: '#' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="breadcrumbs (three)">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Get started', href: '#' },
            { label: 'New to Medicare', href: '#' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="breadcrumbs (four)">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Get started', href: '#' },
            { label: 'New to Medicare', href: '#' },
            { label: 'Sign up', href: '#' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="text-field (default)">
        <TextField name="tf-default" label="Enter some text" />
      </VariantGroup>

      <VariantGroup label="text-field (filled)">
        <TextField name="tf-filled" label="Enter some text" defaultValue="Filled" />
      </VariantGroup>

      <VariantGroup label="text-field (hint)">
        <TextField
          name="tf-hint"
          label="Enter some text"
          hint="This is where you put helpful hint text."
          defaultValue="Filled"
        />
      </VariantGroup>

      <VariantGroup label="text-field (error)">
        <TextField
          name="tf-error"
          label="Enter some text"
          hint="This is where you put helpful hint text."
          errorMessage="This is an example error message."
          defaultValue="Filled"
        />
      </VariantGroup>

      <VariantGroup label="tooltip">
        <Tooltip
          title={
            <>
              <p className="ds-c-mgov-tooltip__title ds-c-mgov-type--action-title">
                Medicare Advantage Plan (Part C)
              </p>
              <p className="ds-c-mgov-tooltip__body ds-c-mgov-type--body">
                A Medicare-approved plan from a private company that offers an alternative to
                Original Medicare (Part A &amp; Part B) for your health and drug coverage. Most
                plans include prescription drug coverage.
              </p>
            </>
          }
        >
          Medicare Advantage Plan (Part C)
        </Tooltip>
      </VariantGroup>

      <VariantGroup label="pill (with close / without)">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Pill
            onRemove={() => {
              console.log('onRemove fired!');
            }}
          >
            Dental coverage
          </Pill>
          <Pill>Dental coverage</Pill>
        </div>
      </VariantGroup>

      <VariantGroup label="alert (informational)">
        <Alert heading="Confidentiality and medical data sharing">
          <p className="ds-c-mgov-type--body">
            In accordance with HIPAA, this application does not store any data. All data is stored
            locally on your computer and is not transmitted to any external servers.
          </p>
        </Alert>
      </VariantGroup>

      <VariantGroup label="alert (with buttons)">
        <Alert heading="Log in to your account to continue">
          <p className="ds-c-mgov-type--body">
            It looks like you may be logged out of your account. Log in to your account to continue.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <Button variation="solid" size="small">
              Login
            </Button>
            <Button size="small">Cancel</Button>
          </div>
        </Alert>
      </VariantGroup>

      <VariantGroup label="alert (success)">
        <Alert variation="success" heading="Your application has been submitted">
          <p className="ds-c-mgov-type--body">
            You successfully submitted your application. You will receive a confirmation email
            within 24 hours.
          </p>
        </Alert>
      </VariantGroup>

      <VariantGroup label="alert (warning)">
        <Alert variation="warn" heading="Copy your API key to a safe location">
          <p className="ds-c-mgov-type--body">
            Once you leave this page, you will not be able to access it.
          </p>
        </Alert>
      </VariantGroup>

      <VariantGroup label="alert (error)">
        <Alert variation="error" heading="There was a problem saving your information">
          <p className="ds-c-mgov-type--body">
            Please review the information you entered and try again.
          </p>
        </Alert>
      </VariantGroup>

      <VariantGroup label="alert (lightweight)">
        <Alert weight="lightweight" heading="You may be able to save money on your monthly premium">
          <p className="ds-c-mgov-type--body">
            Based on your income, you may qualify for a plan that costs less than your current plan.
          </p>
        </Alert>
      </VariantGroup>

      <VariantGroup label="dialog (modal)">
        <Button variation="solid" size="big" onClick={() => setDialogOpen(true)}>
          Open dialog
        </Button>
        <Dialog
          isOpen={dialogOpen}
          heading="A lower-cost option may be available."
          onExit={() => setDialogOpen(false)}
          actions={
            <>
              <Button size="big" onClick={() => setDialogOpen(false)}>
                Continue with brand
              </Button>
              <Button variation="solid" size="big" onClick={() => setDialogOpen(false)}>
                Add generic
              </Button>
            </>
          }
        >
          <p className="ds-c-mgov-type--body">
            <strong>Abilify</strong> comes in a generic version called <strong>aripiprazole</strong>{' '}
            that may cost less. Would you like to add <strong>aripiprazole</strong> to your drug
            list instead?
          </p>
        </Dialog>
      </VariantGroup>

      <VariantGroup label="search — basic (no button, no autocomplete)">
        <Search name="search-basic" placeholder="Hint" />
      </VariantGroup>

      <VariantGroup label="search — with button (no autocomplete)">
        <Search name="search-button" placeholder="Hint" buttonLabel="Add" />
      </VariantGroup>

      <VariantGroup label="search — with autocomplete (no button)">
        <Search
          name="search-ac"
          placeholder="Search"
          items={[
            { id: '1', name: '5mg tablet' },
            { id: '2', name: '10mg tablet' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="search — with autocomplete + button">
        <Search
          name="search-ac-button"
          placeholder="Search"
          buttonLabel="Add"
          items={[
            { id: '1', name: '5mg tablet' },
            { id: '2', name: '10mg tablet' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="dropdown (default)">
        <Dropdown
          name="dd-default"
          label="Dosage"
          defaultValue=""
          options={[
            { label: 'Hint', value: '' },
            { label: '5mg tablet', value: '5' },
            { label: '10mg tablet', value: '10' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="dropdown (filled + hint)">
        <Dropdown
          name="dd-hint"
          label="Dosage"
          hint="This is where you put helpful hint text."
          defaultValue="10"
          options={[
            { label: '5mg tablet', value: '5' },
            { label: '10mg tablet', value: '10' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="dropdown (error)">
        <Dropdown
          name="dd-error"
          label="Dosage"
          errorMessage="This is an example error message."
          defaultValue="10"
          options={[
            { label: '5mg tablet', value: '5' },
            { label: '10mg tablet', value: '10' },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="button — primary / secondary / ghost (large)">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Button variation="solid" size="big">
            Primary
          </Button>
          <Button size="big">Secondary</Button>
          <Button variation="ghost" size="big">
            Ghost
          </Button>
          <Button variation="solid" size="big" disabled>
            Disabled
          </Button>
        </div>
      </VariantGroup>

      <VariantGroup label="button — primary / secondary / ghost (small)">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Button variation="solid" size="small">
            Primary
          </Button>
          <Button size="small">Secondary</Button>
          <Button variation="ghost" size="small">
            Ghost
          </Button>
          <Button variation="solid" size="small" disabled>
            Disabled
          </Button>
        </div>
      </VariantGroup>

      <VariantGroup label="button — with icons (leading / trailing)">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variation="solid" size="big" leadingIcon={<StarIcon />}>
            Primary
          </Button>
          <Button size="big" leadingIcon={<StarIcon />}>
            Secondary
          </Button>
          <Button variation="ghost" size="big" leadingIcon={<StarIcon />}>
            Ghost leading
          </Button>
          <Button variation="ghost" size="big" trailingIcon={<StarIcon />}>
            Ghost trailing
          </Button>
          <Button variation="solid" size="small" leadingIcon={<StarIcon />}>
            Small
          </Button>
        </div>
      </VariantGroup>

      <VariantGroup label="choice block (radio)">
        <ChoiceBlock
          name="cb-radio"
          type="radio"
          label="Choose a plan type"
          choices={[
            { label: 'Original Medicare', value: 'original', defaultChecked: true },
            { label: 'Medicare Advantage', value: 'advantage' },
            {
              label: 'Medicare Advantage',
              value: 'advantage-hint',
              hint: 'Optional helper text.',
            },
          ]}
        />
      </VariantGroup>

      <VariantGroup label="choice block (checkbox)">
        <ChoiceBlock
          name="cb-check"
          type="checkbox"
          label="Add coverage"
          choices={[
            { label: 'Dental', value: 'dental', defaultChecked: true },
            { label: 'Vision', value: 'vision', hint: 'Optional helper text.' },
          ]}
        />
      </VariantGroup>
    </>
  );
}

export default App;
