import * as React from 'react'
import { Router } from '@reach/router'

import PublicRouter from './PublicRouter'

import Auth from '../components/auth/Auth'

const AppRouter = () => (
  <Router>
    <PublicRouter path={'/*'} component={Auth}/>
    {/*<ContentRouter path={'dashboard/*'}/>*/}
  </Router>
)

export default AppRouter
