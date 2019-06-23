import * as React from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiForm,
  EuiFormRow,
  EuiSwitch,
} from '@elastic/eui';
import { createFragmentContainer, graphql } from 'react-relay'

import BoardIoChangeState from './mutation/BoardIoChangeStateMutation';

const BoardIoInput = ({ state, id, pin, name, board }) => {
  return (
    <EuiFormRow label={`${name} - ${board.name} (${pin})`}>
      <EuiSwitch
        name={id}
        label={state ? 'Ligado' : 'Desligado'}
        checked={state}
        onChange={() => BoardIoChangeState.commit({ id, state: !state }, () => {}, () => {})}
      />
    </EuiFormRow>
  )
}

const RoomDetail = ({ handleCloseFlyout, room }) => {
  return (
    <EuiFlyout
      onClose={handleCloseFlyout}
      maxWidth={250}
      style={{
        minWidth: 0
      }}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{room.name}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            Dispositivos
          </p>
        </EuiText>
        <EuiSpacer size="m"/>
        <EuiForm>
        {room.boardIosConnected.edges.map(({ node }, index) => <BoardIoInput key={index} {...node}/>)}
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  )
}

export default createFragmentContainer(RoomDetail, {
  room: graphql`
    fragment RoomDetail_room on Room {
      name
      id
      boardIosConnected(first: 1000) {
        edges {
          cursor
          node {
            id
            state
            name
            pin
            board {
              name
            }
          }
        }
       
      }
    }
  `
})
