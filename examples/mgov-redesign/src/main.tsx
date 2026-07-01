import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Design system base + utilities, Medicare theme tokens, then redesign tokens.
// DS base + utilities, Medicare theme tokens, then the redesign's namespaced
// tokens + typography classes. shared-tokens.css only defines --mgov-* values;
// it does not change any DS token.
import '../../../packages/design-system/dist/css/index.css';
import '../../../packages/ds-medicare-gov/dist/css/medicare-theme.css';
import './styles/shared-tokens.css';
import './styles/typography.css';
// Optional theme layer: maps DS tokens → the --mgov-* values within the
// .ds-theme--mgov wrapper below. Swap for './styles/mgov-theme-global.css' to
// apply globally, or drop it entirely to keep the redesign confined to the
// .ds-c-mgov-* / .ds-c-mgov-type-- classes.
import './styles/mgov-theme-scope.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="ds-theme--mgov">
      <App />
    </div>
  </StrictMode>
);
