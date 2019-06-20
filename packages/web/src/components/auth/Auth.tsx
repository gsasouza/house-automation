import * as React from 'react'

import PosedRouter from '../../router/PosedRouter'

import LoginScreen from './LoginScreen'

const Auth = () => (
  <PosedRouter>
    <LoginScreen default/>
  </PosedRouter>
)

export default Auth;
