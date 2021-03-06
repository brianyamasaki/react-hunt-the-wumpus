import { playerMove } from '../modules/player';
import { randomInt } from '../shared';
import { NUMBER_OF_BATS } from '../shared';
export const BAT_INIT = 'BAT_INIT';
export const BAT_MOVES = 'BAT_MOVES';

const initialState = {
  batCount: NUMBER_OF_BATS,
  batRooms: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BAT_INIT:
      return {
        ...state,
        batRooms: action.payload
      };
    case BAT_MOVES: {
      return {
        ...state,
        batRooms: state.batRooms.map(room => room === action.payload.from ? action.payload.to : room)
      }
    }
    default:
      return state;
  }
}

export const batsInit = (caves) => {
  // currently only one bat in the game
  const batRooms = [];
  for (let i = 0; i < NUMBER_OF_BATS; i++) {
    batRooms.push(Math.trunc(Math.random() * caves.length) + 1);
  }
  console.log(`Bats are in rooms ${batRooms.join(', ')}`)
  return {
    type: BAT_INIT,
    payload: batRooms
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
  const playerTo = randomInt(1, maze.length);
  const batTo = randomInt(1, maze.length);
  // player moves to random cave
  dispatch(playerMove(playerTo));

  // bat moves to random cave
  dispatch(batMoves(playerCave, batTo));
}