import * as React from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '@elastic/eui';

// import BoardAdd from './BoardAdd'
import {createFragmentContainer, graphql} from 'react-relay'

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
            <EuiIcon type="graphApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
      {/*{ isOpenModal && <BoardAdd query={props.query} setOpenModal={setOpenModal}/>}*/}
    </>
  )
}

export default BoardMenu;
// export default createFragmentContainer(BoardMenu, {
//   query: graphql`
//     fragment BoardMenu_query on Query {
//       ...BoardAdd_query
//     }
//   `
// })

