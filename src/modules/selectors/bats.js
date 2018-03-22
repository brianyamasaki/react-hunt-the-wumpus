import { createSelector } from 'reselect';

const getBats = (state) => {
  return state.bats.batCaves;
}

const getPlayer = (state) => {
  return state.player;
}

export const isPlayerWithBat = createSelector(
  [ getPlayer, getBats ],
  (player, bats) => {
    if (bats.indexOf(player.currentCave) === -1) {
      return false;
    } 
    return true;
  }
)
