import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextHelper from './helpers/contextHelper';

ReactDOM.render(
  <React.StrictMode>
    <ContextHelper>
      <App />
    </ContextHelper>
  </React.StrictMode>,
  document.getElementById('root')
);
