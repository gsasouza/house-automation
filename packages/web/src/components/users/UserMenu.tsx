import * as React from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '@elastic/eui';

import UserAdd from './UserAdd'

const UserMenu = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenModal, setOpenModal] = React.useState(false);

  return (
    <>
      <EuiPopover
        id="options"
        button={<EuiButton onClick={() => setOpen(true)}> Opções </EuiButton>}
        isOpen={isOpen}
        closePopover={() => setOpen(false)}
        style={{
          zIndex: 4,
        }}
      >
        <EuiKeyPadMenu>
          <EuiKeyPadMenuItem label="Adicionar Usuário" onClick={() => {
            setOpenModal(true)
            setOpen(false)
          }}>
            <EuiIcon type="usersRolesApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
      { isOpenModal && <UserAdd query={props.query} setOpenModal={setOpenModal}/>}
    </>
  )
}

export default UserMenu;

