import { useState } from 'react';
import type { ReactNode } from 'react';
import { InfoCircleIcon, StarIcon } from '@cmsgov/design-system';
import { Banner } from './components/Banner';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Button } from './components/Button';
import { Dialog } from './components/Dialog';
import { Dropdown } from './components/Dropdown';
import { FeatureCard } from './components/FeatureCard';
import { Search } from './components/Search';
import { TextField } from './components/TextField';
import { Tile } from './components/Tile';

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
          <p>
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
    </>
  );
}

export default App;
