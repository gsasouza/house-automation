import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App';
import Environment from './relay/Environment';

import React from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <RelayEnvironmentProvider environment={Environment}>
    <App />
  </RelayEnvironmentProvider>,
  rootEl,
);
