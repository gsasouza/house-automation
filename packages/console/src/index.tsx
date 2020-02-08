import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App';
import { relayEnvironment } from '@housejs/relay';

import React from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <App />
  </RelayEnvironmentProvider>,
  rootEl,
);
