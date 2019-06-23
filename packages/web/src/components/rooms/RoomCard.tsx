import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { EuiCard, EuiFlexItem } from '@elastic/eui';
import styled from 'styled-components';

import RoomDetail from './RoomDetail'

const KITCHEN = require('../../images/kitchen.jpg');
const BEDROOM = require('../../images/bedroom.jpg');
const BATHROOM = require('../../images/bathroom.jpg');
const LIVING_ROOM = require('../../images/living-room.jpg');

const IMAGES = {
  KITCHEN,
  BATHROOM,
  BEDROOM,
  LIVING_ROOM
}

const FRIENDLY_NAMES = {
  KITCHEN: 'Cozinha',
  BATHROOM: 'Banheiro',
  LIVING_ROOM: 'Sala',
  BEDROOM: 'Quarto'
}

const Wrapper = styled(EuiFlexItem)`
  max-width: 330px;
  min-width: 290px;
`

const RoomCard = ({ room, isDetailOpen, handleOpenDetail, handleCloseDetail }) => {
  return (
    <>
      <Wrapper>
        <EuiCard
          textAlign="left"
          image={IMAGES[room.type]}
          betaBadgeLabel={FRIENDLY_NAMES[room.type]}
          title={room.name}
          description={`Dispositivos Conectados: ${room.boardIosConnectedCount}`}
          onClick={handleOpenDetail}
        />
      </Wrapper>
      { isDetailOpen && <RoomDetail room={room} handleCloseFlyout={handleCloseDetail}/>}
    </>
  )
}

export default createFragmentContainer(RoomCard, {
  room: graphql`
    fragment RoomCard_room on Room {
      id
      name
      type
      boardIosConnectedCount
      ...RoomDetail_room
    }
  `
});
