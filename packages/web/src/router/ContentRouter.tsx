import * as React from 'react';
import { navigate } from '@reach/router'
import styled from 'styled-components';
import {
  EuiLoadingSpinner,
} from '@elastic/eui';

import Content from '../components/common/content/Content'
import PosedRouter from './PosedRouter';
import Dashboard from '../components/dashboard/Dashboard'
import RoomList from '../components/rooms/RoomList'
import BoardIosList from '../components/boardIos/BoardIoList'
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
    !isLoggedIn() && navigate('/login')
    setLoading(false);
  }, [])

  if (isLoading) return (
    <LoadingWrapper>
      <EuiLoadingSpinner size={'m'} />
    </LoadingWrapper>
  )
  return (
    <Content>
      <PosedRouter>
        <Dashboard path={'/'}/>
        <RoomList path={'/rooms'}/>
        <BoardIosList path={'/boardIos'}/>
        <NotFound default />
      </PosedRouter>
    </Content>
  )
}

export default ContentRouter;
