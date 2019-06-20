import * as React from 'react';
import { navigate } from '@reach/router'
import styled from 'styled-components';

import Content from '../components/common/content/Content'
import PosedRouter from './PosedRouter';
import Dashboard from '../components/dashboard/Dashboard'
import { isLoggedIn } from '../helpers/auth'

const NotFound = () => (
  <div>
    NOT FOUND
  </div>
)

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ContentRouter = () => {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      !await isLoggedIn() && navigate('/login')
      setLoading(false);
      return null;
    })();
  }, [])

  if (isLoading) return (
    <LoadingWrapper>
      LOADING
    </LoadingWrapper>
  )
  return (
    <Content>
      <PosedRouter>
        <Dashboard path={'/'}/>
        <NotFound default />
      </PosedRouter>
    </Content>
  )
}

export default ContentRouter;
