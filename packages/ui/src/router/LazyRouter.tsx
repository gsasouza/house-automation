import * as React from 'react';
import { PrivateScreenLoading } from '@housejs/ui';
import { Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: React.ComponentType<{ preloadedQuery: any }>;
  loadingComponent?: React.ComponentType;
  prepare?: () => { query: any };
}

const defaultPrepare = () => ({ query: {} });

const LazyRouter = ({
  prepare = defaultPrepare,
  component: Component,
  loadingComponent: Loading = PrivateScreenLoading,
  ...props
}: Props) => {
  const { query } = prepare();
  return (
    <Route {...props}>
      <React.Suspense fallback={<Loading />}>
        <Component preloadedQuery={query} />
      </React.Suspense>
    </Route>
  );
};

export default LazyRouter;
