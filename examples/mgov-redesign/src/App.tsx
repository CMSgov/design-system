import type { ReactNode } from 'react';
import { InfoCircleIcon, StarIcon } from '@cmsgov/design-system';
import { Banner } from './components/Banner';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Button } from './components/Button';
import { FeatureCard } from './components/FeatureCard';
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
  return (
    <>
      <VariantGroup label="feature-card--small">
        <FeatureCard
          variant="small"
          title={APP_LIBRARY_TITLE}
          body={APP_LIBRARY_BODY}
          ctaLabel="How to report fraud"
        />
      </VariantGroup>

      <VariantGroup label="feature-card--large">
        <FeatureCard
          variant="large"
          title="Already know the type of coverage you want?"
          body="We'll ask you about your needs and priorities, and then show you plans that might be a good fit."
          ctaLabel="Guide me to a plan"
        />
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
