import * as React from 'react'
import { Router } from '@reach/router'

import createLoadable from './createLoadable';

import Auth from '../components/auth/Auth'
const ContentRouter = createLoadable(() => import('./ContentRouter'));
const PublicRouter = createLoadable(() => import('./PublicRouter'))

const AppRouter = () => (
  <Router>
    <PublicRouter path={'/*'} component={Auth}/>
    <ContentRouter path={'dashboard/*'}/>
  </Router>
)

export default AppRouter
