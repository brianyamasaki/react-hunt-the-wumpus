import { createSelector } from 'reselect';

export const PLAYER_WITH_WUMPUS = 'PLAYER_WITH_WUMPUS';
export const PLAYER_NEAR_WUMPUS = 'PLAYER_NEAR_WUMPUS';
export const NOT_NEAR_WUMPUS = 'NOT_NEAR_WUMPUS';

const getMaze = (state) => {
  return state.mazeData.maze;
};

const getWumpus = (state) => {
  return state.wumpus;
}

const getPlayer = (state) => {
  return state.player;
}

export const getPlayerWumpusState = createSelector(
  [ getWumpus, getPlayer, getMaze ],
  (wumpus, player, maze) => {
    if (wumpus.currentCave === player.currentCave) {
      return PLAYER_WITH_WUMPUS;
    } else if (maze[player.currentCave].connections.indexOf(wumpus.currentCave) !== -1){
      return PLAYER_NEAR_WUMPUS;
    }
    return NOT_NEAR_WUMPUS;
  }
)
