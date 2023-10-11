// import '@cmsgov/design-system/dist/css/index.css';
// import '@cmsgov/design-system/dist/css/core-theme.css';
import './styles/index.scss';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) as any
);
