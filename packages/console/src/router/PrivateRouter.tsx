import { PrivateWrapper, PrivateScreenLoading, LazyRouter } from '@housejs/ui';

import { isLoggedIn } from '../utils/security';
import routes from './routes';

import * as React from 'react';
import { useHistory, useRouteMatch, Switch, Redirect } from 'react-router-dom';

const sidebarItems = [{ label: 'Locais', path: '/dashboard/places' }];

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
    <PrivateWrapper sidebarItems={sidebarItems}>
      <Switch>
        {routes.map(route => (
          <LazyRouter {...route} path={route.path(path)} key={route.path(path)} />
        ))}
        <Redirect to="/dashboard/places" />
      </Switch>
    </PrivateWrapper>
  );
};

export default PublicRouter;
