import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.palette.primary};
`;

const Actions = styled.nav`
  display: flex;
  align-items: center;
  > * {
    margin: 0 1rem;
  }
`;

const ContentHeader = ({ title, children }) => {
  return (
    <Container>
      <Helmet>
        <title>{title + ' - House.JS'}</title>
      </Helmet>
      <Title>{title}</Title>
      <Actions>{children}</Actions>
    </Container>
  );
};

export default ContentHeader;
