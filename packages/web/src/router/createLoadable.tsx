import * as React from "react"
import Loadable from "react-loadable"
import styled from 'styled-components';
import {
  EuiLoadingSpinner
} from '@elastic/eui';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
`;

const Loading = () => (
  <LoadingWrapper>
    <EuiLoadingSpinner size="m"/>
  </LoadingWrapper>
)

export default (component) => Loadable({
  loader: component,
  loading: Loading,
})
