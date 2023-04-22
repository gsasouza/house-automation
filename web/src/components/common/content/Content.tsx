import * as React from 'react';
import styled from 'styled-components';
import {
  EuiPage,
  EuiLoadingSpinner,
} from '@elastic/eui';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header'
import Sidebar from './Sidebar';
import { isLoggedIn } from "../../../helpers/auth";

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


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


const Content = () => {
  const [navDrawerRef, setNavDrawerRef] = React.useState(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    !isLoggedIn() && navigate('/login')
    setLoading(false);
  }, [])

  if (isLoading) return (
    <LoadingWrapper>
      <EuiLoadingSpinner size={'m'} />
    </LoadingWrapper>
  )

  return (
    <Wrapper>
      <Header navDrawerRef={navDrawerRef}/>
      <Sidebar setNavDrawerRef={setNavDrawerRef} />
      <Page>
        <Column>
          <HeaderPresence />
          <Outlet />
        </Column>
      </Page>
    </Wrapper>
  )
}

export default Content;
