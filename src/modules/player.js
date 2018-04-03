export const PLAYER_MOVE = 'PLAYER_MOVE';

const initialState = {
  currentRoom: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_MOVE:
      return {
        currentRoom: action.payload + 1
      };
    default:
      return state;
  }
}

export const playerMove = room => {
  return {
    type: PLAYER_MOVE,
    payload: room
  };
}