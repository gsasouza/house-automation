import React from 'react';

const LazyComponent = ({ component: Component }) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component />
  </React.Suspense>
);

export default LazyComponent;
