import * as React from 'react';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo
} from '@elastic/eui'
import { navigate } from '@reach/router'
import styled from 'styled-components';

const FixedHeader = styled(EuiHeader)`
  position: fixed !important;
  width: 100%;
`;

const Header = () => (
  <FixedHeader>
    <EuiHeaderSection grow={false}>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo
          iconType="watchesApp"
          onClick={() => navigate('/dashboard')}
          aria-label="Goes to home"
        />
      </EuiHeaderSectionItem>
    </EuiHeaderSection>

  </FixedHeader>
)

export default Header;
