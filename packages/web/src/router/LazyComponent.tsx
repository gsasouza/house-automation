import LoadingScreen from '../components/loading/LoadingScreen';

import React from 'react';

interface Props {
  component: React.ComponentType;
  loadingComponent?: React.ComponentType;
}

const LazyComponent = ({ component: Component, loadingComponent: Loading = LoadingScreen }: Props) => (
  <React.Suspense fallback={<Loading />}>
    <Component />
  </React.Suspense>
);

export default LazyComponent;
