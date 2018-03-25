export const ARROWS_ADD = 'ARROWS_ADD';
export const ARROWS_SUBTRACT = 'ARROWS_SUBTRACT';

const initialState = {
  count: 3
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARROWS_ADD:
      return {
        count: state.count + action.payload
      };
    case ARROWS_SUBTRACT:
      return {
        count: state.count - action.payload
      };
    default:
      return state;
  }
}

export const arrowsAdd = (amount) => {
  return {
    type: ARROWS_ADD,
    payload: amount
  };
}

export const arrowsSubtract = (amount) => {
  return {
    type: ARROWS_SUBTRACT,
    payload: amount
  }
}