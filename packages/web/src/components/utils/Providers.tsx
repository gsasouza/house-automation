import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import '@elastic/eui/dist/eui_theme_light.css';
import { RelayEnvironmentProvider } from 'relay-hooks'
import { EuiContext } from '@elastic/eui'

import environment from '../../relay/enviroment';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F8;
    margin: 0;
  }
`

import ptBr from '../../i18n/ptBr';


const Providers: React.FC = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <GlobalStyle />
        <EuiContext i18n={{ mapping: ptBr }}>
          <ThemeProvider theme={{}}>
            { children }
          </ThemeProvider>
        </EuiContext>
    </RelayEnvironmentProvider>
  )
}

export default Providers
