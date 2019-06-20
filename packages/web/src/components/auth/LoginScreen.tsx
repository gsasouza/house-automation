
import * as React from 'react';
import styled from 'styled-components';
//
// import LoginForm from './LoginForm';
// import LoginFooter from './LoginFooter'
// import LoginContent from './LoginContent';

const backgroundImage = require('../../../assets/background-login.jpg')

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
  justify-content: space-evenly;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(51, 163, 255, 0.8) 54.1%, rgba(236, 236, 236, 0.8) 100%);
`

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;  
  flex-wrap: wrap;
`;

const LoginScreen = () => {
  return (
    <WrapperImage>
      <Wrapper>
        {/*<Row>*/}
          {/*<LoginContent/>*/}
          {/*<LoginForm />*/}
        {/*</Row>*/}
        {/*<LoginFooter/>*/}
      </Wrapper>
    </WrapperImage>
  )
}

export default LoginScreen;
