import * as React from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
} from '@elastic/eui';


const RoomDetail = ({ handleCloseFlyout, name }) => {
  return (
    <EuiFlyout
      onClose={handleCloseFlyout}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{name}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            DISPOSITIVOS
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  )
}

export default RoomDetail;
