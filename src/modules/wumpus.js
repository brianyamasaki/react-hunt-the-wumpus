export const WUMPUS_INIT = 'WUMPUS_INIT';
export const WUMPUS_MOVE = 'WUMPUS_INIT';

const initialState = {
  currentRoom: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WUMPUS_INIT:
      let currentRoom = '';
      if (action.payload) {
        currentRoom = Math.trunc(Math.random()*action.payload);
      }
      console.log('wumpus is in room ' + (currentRoom + 1));
      return {
        currentRoom
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