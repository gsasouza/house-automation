import LoadingScreen from '../components/loading/LoadingScreen';
import { isLoggedIn } from '../utils/security';

import LazyComponent from './LazyComponent';

import * as React from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      if (await isLoggedIn()) return history.push('/dashboard');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Switch>
      <Route path="/">
        <LazyComponent component={React.lazy(() => import('../screens/Auth/Login'))} />
      </Route>
    </Switch>
  );
};

export default PublicRouter;
