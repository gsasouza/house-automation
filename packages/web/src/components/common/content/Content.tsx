import * as React from 'react';
import styled from 'styled-components';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
} from '@elastic/eui';

import Header from './Header'
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Page = styled(EuiPage)`
  margin-left: 50px;
`

const Content = ({ children }) => {

  return (
    <Wrapper>
      <Header/>
      <Sidebar />
      <Page>
        <EuiPageBody>
          <EuiPageContent>
            { children }
          </EuiPageContent>
        </EuiPageBody>
      </Page>
    </Wrapper>
  )
}

export default Content;
