import { NUMBER_OF_PITS } from '../shared';
export const PIT_INIT = 'PIT_INIT';

const initialState = {
  pitCount: NUMBER_OF_PITS,
  pitRooms: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PIT_INIT:
      return {
        ...state,
        pitRooms: action.payload
      };
    default:
      return state;
  }
}

export const pitsInit = (caves) => {
  const batCaves = [];
  for(let i = 0; i < NUMBER_OF_PITS; i++) {
    batCaves.push(Math.trunc(Math.random() * caves.length) + 1);
  }
  return {
    type: PIT_INIT,
    payload: batCaves
  };
}