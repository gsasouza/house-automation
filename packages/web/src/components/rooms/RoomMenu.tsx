import * as React from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '@elastic/eui';

import RoomAdd from './RoomAdd'

const RoomMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenModal, setOpenModal] = React.useState(false);

  return (
    <>
      <EuiPopover
        id="options"
        button={<EuiButton onClick={() => setOpen(true)}> Opções </EuiButton>}
        isOpen={isOpen}
        closePopover={() => setOpen(false)}
      >
        <EuiKeyPadMenu>
          <EuiKeyPadMenuItem label="Adicionar Cômodo" onClick={() => {
            setOpenModal(true)
            setOpen(false)
          }}>
            <EuiIcon type="spacesApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
      { isOpenModal && <RoomAdd setOpenModal={setOpenModal}/>}
    </>
  )
}

export default RoomMenu
