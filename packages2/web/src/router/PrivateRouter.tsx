import { isLoggedIn } from '../utils/security';

import * as React from 'react';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import LazyComponent from './LazyComponent'

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

  if (isLoading) return <div> Loading ... </div>;

  return (
    <Switch>
      <Route path={path}>
        <LazyComponent component={React.lazy(() => import('../components/Screen2'))} />
      </Route>
    </Switch>
  );
};

export default PublicRouter;
