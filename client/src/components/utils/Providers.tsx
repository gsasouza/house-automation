import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { EuiContext } from '@elastic/eui'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F8;
    margin: 0;
  }
`

import ptBr from '../../i18n/ptBr';

const Providers: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle/>
      <EuiContext i18n={{ mapping: ptBr }}>
        <ThemeProvider theme={{}}>
          {children}
        </ThemeProvider>
      </EuiContext>
    </>
  )
}

export default Providers
