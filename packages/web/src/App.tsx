import '@babel/polyfill'
import * as React from 'react';
import ReactDOM from 'react-dom'

import AppRouter from './router/AppRouter';
import Providers from './components/utils/Providers';

const App = () => (
  <Providers>
    <AppRouter />
  </Providers>
)

ReactDOM.render(<App />, document.getElementById('root'))
