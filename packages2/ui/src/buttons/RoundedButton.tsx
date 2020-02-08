import { getLightenDarkenColor, getFontColor } from '../utils';

import LoadingWave from '../loading/LoadingWave';

import * as React from 'react';
import { Button } from 'reakit';
import styled, { css } from 'styled-components';

interface Props {
  color?: string;
  fullWidth?: boolean;
}

const StyledButton = styled(Button)<Props>`
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  padding: 16px 48px 18px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  cursor: pointer;
  font-weight: bold;
  color: ${props => getFontColor(props.theme.palette[props.color || 'primary'])};
  ${props => props.fullWidth && 'width: 100%'};
  background-color: ${props => props.theme.palette[props.color || 'primary']};
  &:hover {
    background-color: ${props => getLightenDarkenColor(props.theme.palette[props.color || 'primary'], 30)};
  }
  &:disabled {
    background-color: rgb(221, 221, 221);
  }
`;

const Container = styled.div<{ fullWidth?: boolean; isLoading?: boolean }>`
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      > button {
        width: 100%;
      }
    `};
  position: relative;
  border-radius: 500px;
  div:first-child {
    position: absolute;
    border-radius: 500px;
    top: 0;
    left: 0;
    visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
    > svg {
      border-radius: 500px;
      height: 48px;
    }
  }
`;

const RoundedButton = ({ children, fullWidth, ...props }) => {
  return (
    <Container fullWidth={fullWidth} {...props}>
      <StyledButton {...props}>
        <LoadingWave />
        {children}
      </StyledButton>
    </Container>
  );
};

export default RoundedButton;
