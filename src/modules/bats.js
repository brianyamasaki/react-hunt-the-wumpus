import { playerMove } from '../modules/player';
export const BAT_INIT = 'BAT_INIT';
export const BAT_MOVES_PLAYER = 'BAT_MOVES_PLAYER';
export const BAT_MOVES = 'BAT_MOVES';

const initialState = {
  batCaves: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BAT_INIT:
      return {
        batCaves: action.payload
      };
    default:
      return state;
  }
}

export const batsInit = (caves) => {
  // currently only one pit in the game
  return {
    type: BAT_INIT,
    payload: [Math.trunc(Math.random() * caves.length)]
  };
}

export const batMoves = (from, to) => {
  return {
    type: BAT_MOVES,
    payload: {
      from,
      to
    }
  };
}

export const batMovesPlayer = (maze, playerCave) => dispatch => {
  const playerTo = Math.trunc(Math.random() * maze.length);
  const batTo = Math.trunc(Math.random() * maze.length);
  // player moves to random cave
  dispatch(playerMove(playerTo));

  // bat moves to random cave
  dispatch(batMoves(playerCave, batTo));
}