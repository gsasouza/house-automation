import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

const Label = styled.h1`
  color: ${props => props.theme.palette.primary};
  ${media.lessThan('small')`
    text-align: center;
  `}
`;

const Divider = styled.div`
  border-top: 1px solid #d9dadc;
  display: block;
  line-height: 1px;
  margin: 15px 0;
  position: relative;
  text-align: center;
`;

const CardHeader = props => (
  <div>
    <Label {...props} />
    <Divider />
  </div>
);

export default CardHeader;
