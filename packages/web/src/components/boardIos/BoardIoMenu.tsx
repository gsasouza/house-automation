import * as React from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '@elastic/eui';

import BoardIoAdd from './BoardIoAdd'
import {createFragmentContainer, graphql} from 'react-relay'

const BoardIoMenu = (props) => {
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
          <EuiKeyPadMenuItem label="Adicionar Dispositivo" onClick={() => {
            setOpenModal(true)
            setOpen(false)
          }}>
            <EuiIcon type="graphApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
      { isOpenModal && <BoardIoAdd query={props.query} setOpenModal={setOpenModal}/>}
    </>
  )
}

export default createFragmentContainer(BoardIoMenu, {
  query: graphql`
    fragment BoardIoMenu_query on Query {
      ...BoardIoAdd_query
    }
  `
})

