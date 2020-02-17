import { LazyComponent } from '@housejs/ui';

import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path="/" exact>
          <LazyComponent component={React.lazy(() => import('./PublicRouter'))} />
        </Route>
        <Route path={'/dashboard'}>
          <LazyComponent component={React.lazy(() => import('./PrivateRouter'))} />
        </Route>
      </Switch>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
