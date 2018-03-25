export const PIT_INIT = 'PIT_INIT';

const initialState = {
  pitCount: 1,
  pitCaves: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PIT_INIT:
      return {
        // currently only one pit
        ...state,
        pitCaves: [Math.trunc(Math.random() * action.payload)]
      };
    default:
      return state;
  }
}

export const pitsInit = (caves) => {
  return {
    type: PIT_INIT,
    payload: caves.length
  };
}