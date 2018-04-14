export const PLAYER_MOVE = 'PLAYER_MOVE';
export const PLAYER_INIT = 'PLAYER_INIT';
export const PLAYER_INCREMENT_MOVE = 'PLAYER_INCREMENT_MOVE';

const initialState = {
  currentRoom: '',
  roomIndex: '',
  moveCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_MOVE:
      return {
        roomIndex: action.payload,
        currentRoom: action.payload + 1,
        moveCount: state.moveCount + 1
      };
    case PLAYER_INCREMENT_MOVE:
      return {
        ...state,
        moveCount: state.moveCount + 1
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

export const incrementMove = () => (
  {
    type: PLAYER_INCREMENT_MOVE
  }
)