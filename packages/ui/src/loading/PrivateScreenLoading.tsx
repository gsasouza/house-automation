import * as React from 'react';
import styled from 'styled-components';
import { PrivateWrapper } from '../content';
import { LoadingScreenContent } from './LoadingScreen';

const Wrapper = styled.div`
  a > div {
    color: transparent;
  }
`;

const PrivateScreenLoading = () => {
  return (
    <Wrapper>
      <PrivateWrapper>
        <LoadingScreenContent />
      </PrivateWrapper>
    </Wrapper>
  );
};

export default PrivateScreenLoading;
