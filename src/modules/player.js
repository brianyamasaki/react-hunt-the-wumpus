export const PLAYER_MOVE = 'PLAYER_MOVE';
export const PLAYER_INIT = 'PLAYER_INIT';

const initialState = {
  currentRoom: '',
  roomIndex: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_MOVE:
      return {
        roomIndex: action.payload,
        currentRoom: action.payload + 1
      };
    case PLAYER_INIT:
      return initialState;
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

export const playerInit = () => {
  return {
    type: PLAYER_INIT
  }
}