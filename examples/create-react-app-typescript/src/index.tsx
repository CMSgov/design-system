// import '@cmsgov/ds-healthcare-gov/dist/css/index.css';
// import '@cmsgov/ds-healthcare-gov/dist/css/core-theme.css';
import './styles/index.scss';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) as any,
  document.getElementById('root')
);
