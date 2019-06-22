import * as React from 'react';
import { QueryRenderer } from 'react-relay';
import {
  EuiLoadingSpinner
} from '@elastic/eui';
import styled from 'styled-components';

import environment from './environment';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export function createQueryRenderer(
  FragmentComponent,
  config
) {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component {

    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={variables}
          render={({ error, props }) => {
            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }
            if (error) {
              return <div> error </div>
            }
            return (
              <LoadingWrapper>
                <EuiLoadingSpinner size={'l'}/>
              </LoadingWrapper>
            )

          }}
        />
      );
    }
  }

  return QueryRendererWrapper;
}
