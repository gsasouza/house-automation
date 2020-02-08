import { PrivateWrapper, PrivateScreenLoading, LoadingScreenContent } from '@housejs/ui';

import { isLoggedIn } from '../utils/security';

import LazyComponent from './LazyComponent';

import * as React from 'react';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();
  const { path } = useRouteMatch();

  React.useEffect(() => {
    (async () => {
      if (!(await isLoggedIn())) return history.push('/');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <PrivateScreenLoading />;

  return (
    <PrivateWrapper>
      <Switch>
        <Route path={`${path}/places`} default>
          <LazyComponent component={React.lazy(() => import('../screens/Places/PlacesList'))} loadingComponent={LoadingScreenContent}/>
        </Route>
        <Route path={`${path}/users`}>
          <LazyComponent component={React.lazy(() => import('../screens/Places/PlacesList'))} loadingComponent={LoadingScreenContent} />
        </Route>
        <Route path={`{path}/test`}>
          <LazyComponent component={React.lazy(() => import('../screens/Places/PlacesList'))} loadingComponent={LoadingScreenContent} />
        </Route>
      </Switch>
    </PrivateWrapper>
  );
};

export default PublicRouter;
