import AppRouter from './router/AppRouter';
import Providers from './utils/Providers';

import React from 'react';

type Props = {};

const App = ({}: Props) => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
