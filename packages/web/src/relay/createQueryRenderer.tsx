import * as React from 'react';
import { useQuery } from 'relay-hooks'

import { EuiLoadingSpinner } from '@elastic/eui'

export const createQueryRenderer = (
  FragmentComponent,
  config
) => {
  const { query, queriesParams } = config;

  return (componentProps) => {
    const variables = queriesParams ? queriesParams(componentProps) : config.variables;
    const { props, error } = useQuery({
      query,
      variables
    });
    if (props) {
      return <FragmentComponent {...componentProps} query={props} />;
    }
    if (error) {
      return <div> error </div>
    }
    return <EuiLoadingSpinner/>

  }
}
