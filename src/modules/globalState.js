export const TOGGLE_DEBUG_STATE = 'TOGGLE_DEBUG_STATE';
export const GAME_OVER = 'GAME_OVER';
export const GAME_RESET = 'GAME_RESET';

const initialState = {
  debugMode: false,
  gameOver: false,
  gameOverMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DEBUG_STATE:
      return {
        ...state,
        debugMode: !state.debugMode
      };
    case GAME_OVER:
      return {
        ...state,
        gameOver: true,
        gameOverMessage: action.payload
      };
    case GAME_RESET:
      return {
        ...state,
        gameOver: false,
        gameOverMessage: ''
      };
    default:
      return state;
  }
}

export const toggleDebugMode = () => {
  return {
    type: TOGGLE_DEBUG_STATE
  }
}

export const gameOver = message => {
  return {
    type: GAME_OVER,
    payload: message
  }
}

export const gameReset = () => {
  return {
    type: GAME_RESET
  }
}