export const WUMPUS_INIT = 'WUMPUS_INIT';
export const WUMPUS_MOVE = 'WUMPUS_INIT';

const initialState = {
  roomIndex: '',
  currentRoom: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WUMPUS_INIT:
      let roomIndex = '';
      let currentRoom = '';
      if (action.payload) {
        roomIndex = Math.trunc(Math.random()*action.payload);
        currentRoom = roomIndex + 1;
      }
      console.log('wumpus is in room ' + (currentRoom));
      return {
        roomIndex,
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