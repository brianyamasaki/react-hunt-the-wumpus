import { createSelector } from 'reselect';
export const PLAYER_NEAR_BAT = 'PLAYER_NEAR_BAT';
export const PLAYER_WITH_BAT = 'PLAYER_WITH_BAT';
export const NOT_NEAR_BAT = 'NOT_NEAR_BAT';

const getBats = (state) => {
  return state.bats.batRooms;
}

const getPlayer = (state) => {
  return state.player;
}

const getMaze = (state) => {
  return state.mazeData.maze;
};

export const isPlayerWithBat = createSelector(
  [ getPlayer, getBats ],
  (player, bats) => {
    if (bats.indexOf(player.currentRoom) === -1) {
      return false;
    } 
    return true;
  }
)

export const getPlayerBatState = createSelector(
  [getBats, getPlayer, getMaze],
  (bats, player, maze) => {
    if (player.currentRoom === '')
      return NOT_NEAR_BAT;
    if (bats.indexOf(player.currentRoom) !== -1) {
      return PLAYER_WITH_BAT;
    } else if (maze[player.roomIndex].connections.find( roomIndex => bats.indexOf(roomIndex + 1) !== -1)) {
      return PLAYER_NEAR_BAT;
    } 
    return NOT_NEAR_BAT;
  }
)
