export const PURSE_INIT = 'PURSE_INIT';
export const PURSE_ADD = 'PURSE_ADD';
export const PURSE_SUBTRACT = 'PURSE_SUBTRACT';

const initialState = {
  amount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURSE_INIT: 
      return {
        amount: 0
      }
    case PURSE_ADD: 
      return {
        amount: state.amount + action.payload
      };
    case PURSE_SUBTRACT: 
      return {
        amount: state.amount - action.payload
      };
    default:
      return state;
  }
}

export const purseInit = () => {
  return {
    type: PURSE_INIT
  };
}

export const purseAdd = (amount) => {
  return {
    type: PURSE_ADD,
    payload: amount
  };
}

export const purseSubtract = (amount) => {
  return {
    type: PURSE_SUBTRACT,
    payload: amount
  };
}