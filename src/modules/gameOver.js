export const GAME_OVER = 'GAME_OVER';

const initialState = {
  message: ''
};

export default (state = initialState, action)  => {
  switch (action.type) {
    case GAME_OVER:
      return {
        message: action.payload
      };
    default:
      return state;
  }
}

export const gameOver = msg => {
  return {
    type: GAME_OVER,
    payload: msg
  };
}