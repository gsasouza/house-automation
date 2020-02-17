import * as React from 'react';
import { Box } from 'reakit';
import styled from 'styled-components';
import media from 'styled-media-query'

interface Props {
  width?: string;
}

const Container = styled(Box)<Props>`
  width: ${props => props.width || 'auto'};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 36px 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media.lessThan('medium')`
     padding: 10px 20px;
     width: 410px;
  `};
  ${media.lessThan('small')`
     padding: 10px 15px;
     width: 85%;
     margin: auto;
  `};
`;

const Card: React.FunctionComponent<Props> = ({ children, ...props }) => <Container {...props}>{children}</Container>;

export default Card;
