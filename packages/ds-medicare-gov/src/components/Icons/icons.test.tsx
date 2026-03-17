import { render, screen } from '@testing-library/react';
import { setLanguage } from '@cmsgov/design-system';
import { AbuseIcon, CostsIcon } from './index';

describe('Icons', () => {
  afterEach(() => {
    setLanguage('en');
  });

  it('renders translated titles from core in English', () => {
    setLanguage('en');

    render(
      <>
        <AbuseIcon ariaHidden={false} />
        <CostsIcon ariaHidden={false} />
      </>
    );

    expect(screen.getByTitle('Abuse')).toBeInTheDocument();
    expect(screen.getByTitle('Costs')).toBeInTheDocument();
  });

  it('renders translated titles from core in Spanish', () => {
    setLanguage('es');

    render(
      <>
        <AbuseIcon ariaHidden={false} />
        <CostsIcon ariaHidden={false} />
      </>
    );
    expect(screen.getByTitle('Abuso')).toBeInTheDocument();
    expect(screen.getByTitle('Costos')).toBeInTheDocument();
  });
});
