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

// const AppRefetchContainer = createRefetchContainer(
//   App,
//   {
//     query: graphql`
//       fragment App_query on Query @argumentDefinitions(first: { type: Int }, search: { type: String }) {
//         events(first: $first, search: $search) @connection(key: "App_events", filters: []) {
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//           edges {
//             node {
//               id
//               title
//             }
//           }
//         }
//       }
//     `,
//   },
//   graphql`
//     query AppRefetchQuery($first: Int, $search: String) {
//       ...App_query @arguments(first: $first, search: $search)
//     }
//   `,
// );
