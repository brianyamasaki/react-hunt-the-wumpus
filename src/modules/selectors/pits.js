import { createSelector } from 'reselect';
export const PLAYER_NEAR_PIT = 'PLAYER_NEAR_PIT';
export const PLAYER_IN_PIT = 'PLAYER_IN_PIT';
export const NOT_NEAR_PIT = 'NOT_NEAR_PIT';

const getPits = (state) => {
  return state.pits.pitRooms;
}

const getPlayer = (state) => {
  return state.player;
}

const getMaze = (state) => {
  return state.mazeData.maze;
};

export const isPlayerInPit = createSelector(
  [ getPlayer, getPits ],
  (player, pits) => {
    if (pits.indexOf(player.currentRoom) === -1) {
      return false;
    } 
    return true;
  }
)

export const getPlayerPitState = createSelector(
  [getPits, getPlayer, getMaze],
  (pits, player, maze) => {
    if (player.currentRoom === '')
      return NOT_NEAR_PIT;
    if (pits.indexOf(player.currentRoom) !== -1) {
      return PLAYER_IN_PIT;
    } else if (maze[player.roomIndex].connections.find( roomIndex => pits.indexOf(roomIndex + 1) !== -1)) {
      return PLAYER_NEAR_PIT;
    } 
    return NOT_NEAR_PIT;
  }
)
