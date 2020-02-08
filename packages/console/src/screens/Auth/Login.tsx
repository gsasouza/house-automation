import LoginForm from './components/LoginForm';

import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

const ImageBackground = styled.div`
  width: 100%;
  position: absolute;
  background-size: cover !important;
`;

const Wrapper = styled.main(
  props => `
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(180deg, ${props.theme.palette.primary} 77%, ${props.theme.palette.accent} 100%);
`,
);

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 1366px;
  margin: auto;
  padding: 0 30px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  ${media.lessThan('huge')`
    max-width: 1100px;
  `}
  ${media.lessThan('large')`
    max-width: 730px;
  `}
  ${media.lessThan('medium')`
    max-width: 500px;
    padding: 0;
    grid-template-columns: 1fr;
  `}
`;

const Title = styled.h1`
 ${media.lessThan('medium')`
    text-align: center;
  `}
`;

const LoginScreen = () => {
  return (
    <ImageBackground>
      <Wrapper>
        <Container>
          <Title>House JS</Title>
          <LoginForm />
        </Container>
      </Wrapper>
    </ImageBackground>
  );
};

export default LoginScreen;
