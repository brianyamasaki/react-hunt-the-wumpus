import { createSelector } from 'reselect';

const getBats = (state) => {
  return state.bats.batRooms;
}

const getPlayer = (state) => {
  return state.player;
}

export const isPlayerWithBat = createSelector(
  [ getPlayer, getBats ],
  (player, bats) => {
    if (bats.indexOf(player.currentRoom) === -1) {
      return false;
    } 
    return true;
  }
)
