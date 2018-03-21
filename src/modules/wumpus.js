export const WUMPUS_INIT = 'WUMPUS_INIT';
export const WUMPUS_MOVE = 'WUMPUS_INIT';

const initialState = {
  currentCave: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WUMPUS_INIT:
      let currentCave = '';
      if (action.payload) {
        currentCave = Math.trunc(Math.random()*action.payload);
      }
      console.log('wumpus is in cave ' + (currentCave + 1));
      return {
        currentCave
      };
    default: 
      return state;
  }
}

export const wumpusInit = caves => {
  return {
    type: WUMPUS_INIT,
    payload: caves.length
  };
}