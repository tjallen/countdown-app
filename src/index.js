// optional normalize.css and global css if needed
import 'normalize.css/normalize.css';
import './global.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <App />,
  rootElement
);
