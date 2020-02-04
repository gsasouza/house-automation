import { isLoggedIn } from '../utils/security';

import * as React from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import LazyComponent from './LazyComponent'

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      if (await isLoggedIn()) return history.push('/dashboard');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <div> Loading ... </div>;

  return (
    <Switch>
      <Route path="/">
        <LazyComponent component={React.lazy(() => import('../screens/Auth/Login'))} />
      </Route>
    </Switch>
  );
};

export default PublicRouter;
