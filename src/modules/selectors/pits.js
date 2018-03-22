import { createSelector } from 'reselect';

const getPits = (state) => {
  return state.pits.pitCaves;
}

const getPlayer = (state) => {
  return state.player;
}

export const isPlayerInPit = createSelector(
  [ getPlayer, getPits ],
  (player, pits) => {
    if (pits.indexOf(player.currentCave) === -1) {
      return false;
    } 
    return true;
  }
)
