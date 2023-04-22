import * as React from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '@elastic/eui';

import BoardAdd from './BoardAdd'

const BoardMenu = (props) => {
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
          <EuiKeyPadMenuItem label="Adicionar Dispositivo" onClick={() => {
            setOpenModal(true)
            setOpen(false)
          }}>
            <EuiIcon type="managementApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
      { isOpenModal && <BoardAdd query={props.query} setOpenModal={setOpenModal}/>}
    </>
  )
}

export default BoardMenu;

