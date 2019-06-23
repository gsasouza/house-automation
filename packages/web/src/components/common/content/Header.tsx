import * as React from 'react';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiShowFor,
  EuiHeaderSectionItemButton,
  EuiIcon
} from '@elastic/eui'
import { navigate } from '@reach/router'
import styled from 'styled-components';

const FixedHeader = styled(EuiHeader)`
  position: fixed !important;
  width: 100%;
`;

const Header = ({ navDrawerRef }) => (
  <FixedHeader>
    <EuiHeaderSection grow={false}>
      <EuiShowFor sizes={['xs', 's']}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderSectionItemButton
            aria-label="Open nav"
            onClick={() => navDrawerRef.toggleOpen()}
          >
            <EuiIcon type="apps" href="#" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiShowFor>
      <EuiShowFor sizes={['m', 'l', 'xl']}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo
            iconType="watchesApp"
            onClick={() => navigate('/dashboard')}
            aria-label="Goes to home"
          />
        </EuiHeaderSectionItem>
      </EuiShowFor>
    </EuiHeaderSection>

  </FixedHeader>
)

export default Header;
