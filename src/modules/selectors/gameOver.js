import { createSelector } from 'reselect';

const getPurseAmount = (state) => {
  return state.purse.amount;
}

export const isOutOfCoin = createSelector(
  [ getPurseAmount ],
  ( amount ) => {
    if (amount < 0) {
      return true;
    }
    return false;
  }
)