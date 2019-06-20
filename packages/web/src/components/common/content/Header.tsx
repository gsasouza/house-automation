import * as React from 'react';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo
} from '@elastic/eui'
import { navigate } from '@reach/router'

const Header = () => (
  <EuiHeader>
    <EuiHeaderSection grow={false}>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo
          iconType="watchesApp"
          onClick={() => navigate('/dashboard')}
          aria-label="Goes to home"
        />
      </EuiHeaderSectionItem>
    </EuiHeaderSection>

  </EuiHeader>
)

export default Header;
