import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import '@elastic/eui/dist/eui_theme_light.css';
import { RelayEnvironmentProvider } from 'relay-hooks'

import environment from '../../relay/enviroment';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F8;
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }
  * {
    font-family: 'Poppins', sans-serif;
  }
`

const Providers: React.FC = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <GlobalStyle />
        <ThemeProvider theme={{}}>
          { children }
        </ThemeProvider>
    </RelayEnvironmentProvider>
  )
}

export default Providers
