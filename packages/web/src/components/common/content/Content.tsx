import * as React from 'react';
import styled from 'styled-components';
import {
  EuiPage,
} from '@elastic/eui';

import Header from './Header'
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const HeaderPresence = styled.div`
   width: 100%;
   height: 34px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Page = styled(EuiPage)`
  margin-left: 50px;
  @media(max-width: 767px) {
    margin-left: 0;
  }
  > div:last-child {
    width: 100%;
  }
`
const Content = ({ children }) => {
  const [navDrawerRef, setNavDrawerRef] = React.useState(null);
  return (
    <Wrapper>
      <Header navDrawerRef={navDrawerRef}/>
      <Sidebar setNavDrawerRef={setNavDrawerRef} />
      <Page>
        <Column>
        <HeaderPresence />
        { children }
        </Column>
      </Page>
    </Wrapper>
  )
}

export default Content;
