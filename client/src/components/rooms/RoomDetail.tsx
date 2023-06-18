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

const BoardIoInput = ({ state, id, pin, name, board, connected }) => {
  // const connected = true;
  const label = connected ? (state ? 'Ligado' : 'Desligado') : 'Desconectado';
  return (
    <EuiFormRow label={`${name} - ${board.name} (${pin})`}>
      <EuiSwitch
        disabled={!connected}
        name={id}
        label={label}
        checked={state}
        onChange={() => BoardIoChangeState.commit({ id, state: !state }, () => {
        }, () => {
        })}
      />
    </EuiFormRow>
  )
}

const RoomDetail = ({ handleCloseFlyout, room }) => {

  if (!room) return null;

  const { boardIosConnected, name } = room;

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
          <h2>{name}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            {!boardIosConnected?.count ?
              'Nenhum dispositivo conectado neste cômodo :(' :
              'Dispositivos'
            }
          </p>
        </EuiText>
        <EuiSpacer size="m"/>
        <EuiForm>
          {(room.boardIosConnected?.edges ?? []).map(({ node }, index) => <BoardIoInput key={index} {...node}/>)}
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
              count
              edges {
                  cursor
                  node {
                      id
                      state
                      name
                      pin
                      connected
                      board {
                          name
                      }
                  }
              }

          }
      }
  `
})
