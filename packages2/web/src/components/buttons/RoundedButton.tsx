import { getLightenDarkenColor, getFontColor } from '../../utils';

import { Button } from 'reakit';
import styled from 'styled-components';

interface Props {
  color?: string;
  fullWidth?: boolean;
}

const RoundedButton = styled(Button)<Props>`
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
`;

export default RoundedButton;
