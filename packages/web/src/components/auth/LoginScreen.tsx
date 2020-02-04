import * as React from 'react';
import styled from 'styled-components';

import LoginForm from './LoginForm';

const backgroundImage = require('../../images/background-login.png')

const WrapperImage = styled.div`
  width: 100%;
  position: absolute;
  background-size: cover !important;
  background: url(${backgroundImage});
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(7, 71, 166, 0.73) 54.1%,rgba(7, 71, 166, 0.49) 100%);
`
const LoginScreen = () => {
  return (
    <WrapperImage>
      <Wrapper>
        <LoginForm />
      </Wrapper>
    </WrapperImage>
  )
}

export default LoginScreen;
