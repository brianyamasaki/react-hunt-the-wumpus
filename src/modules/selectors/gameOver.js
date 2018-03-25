import { createSelector } from 'reselect';

const getPurseAmount = (state) => {
  return state.purse.amount;
}

export const isGameOver = createSelector(
  [ getPurseAmount ],
  ( amount ) => {
    if (amount < 0) {
      return true;
    }
    return false;
  }
)