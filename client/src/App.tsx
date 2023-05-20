import '@babel/polyfill'
import '@elastic/eui/dist/eui_theme_light.css';
import * as React from 'react';
import ReactDOM from 'react-dom'

import './styles.css'
import AppRouter from './router/AppRouter';
import Providers from './components/utils/Providers';


const App = () => (
  <Providers>
    <AppRouter />
  </Providers>
)


ReactDOM.render(<App />, document.getElementById('root'))
