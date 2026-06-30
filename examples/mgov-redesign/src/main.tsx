import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Design system base + utilities, Medicare theme tokens, then redesign tokens.
// Order matters: theme vars must load before the mgov-vars overrides that consume them.
// Component-level styles are imported by each component module.
import '../../../packages/design-system/dist/css/index.css';
import '../../../packages/ds-medicare-gov/dist/css/medicare-theme.css';
import './styles/mgov-vars.css';
import './styles/typography.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
