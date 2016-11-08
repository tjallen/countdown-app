import 'normalize.css/normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('app');

function isRunningInElectron() {
  if (typeof window.process === 'undefined') return false;
  return typeof window.process.versions.electron === 'string';
}
window.isElectron = isRunningInElectron();

ReactDOM.render(
  <App />,
  rootElement
);
