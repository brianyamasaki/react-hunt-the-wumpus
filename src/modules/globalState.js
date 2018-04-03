export const TOGGLE_DEBUG_STATE = 'TOGGLE_DEBUG_STATE';

const initialState = {
  debugMode: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DEBUG_STATE:
      return {
        ...state,
        debugMode: !state.debugMode
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