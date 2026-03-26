import { render, screen } from '@testing-library/react';
import { setLanguage } from '@cmsgov/design-system';
import { AbuseIcon, CostsIcon } from './index';

describe('Medicare Icons', () => {
  describe('translations', () => {
    it('renders English titles when language is set to en', () => {
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

    it('renders Spanish titles when language is set to es', () => {
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
});
