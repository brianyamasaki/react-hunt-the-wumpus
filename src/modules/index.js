import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mazeFetchReducer from './mazeFetch';
import mazesReducer from './mazesFetch';
import triviaReducer from './trivia';
import wumpusReducer from './wumpus';
import playerReducer from './player';
import pitsReducer from './pits';
import batsReducer from './bats';

export default combineReducers({
  routing: routerReducer,
  mazes: mazesReducer,
  mazeData: mazeFetchReducer,
  trivia: triviaReducer,
  wumpus: wumpusReducer,
  player: playerReducer,
  pits: pitsReducer,
  bats: batsReducer
});