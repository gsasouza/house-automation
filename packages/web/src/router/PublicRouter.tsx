import * as React from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components';

import { isLoggedIn } from '../helpers/auth'

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const PublicRouter = ({ component: Component, ...props }) => {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      await isLoggedIn() && navigate('/dashboard')
      setLoading(false);
      return null;
    })();
  }, [])

  if (isLoading) return (
    <LoadingWrapper>
      LOADING
    </LoadingWrapper>
  )

  return <Component {...props} />
}

export default PublicRouter
