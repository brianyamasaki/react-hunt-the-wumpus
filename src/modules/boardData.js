export const FETCH_BOARD_DATA = 'FETCH_BOARD_DATA';
export const FETCH_BOARD_DATA_SUCCESS = 'FETCH_BOARD_DATA_SUCCESS';
export const FETCH_BOARD_DATA_FAIL = 'FETCH_BOARD_DATA_FAIL';

const initialState = {
  heightDenominator: 0,
  widthDenominator: 0,
  rooms: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}