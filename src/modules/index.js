import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mazeFetchReducer from './mazeFetch';
import mazesReducer from './mazesFetch';

export default combineReducers({
  routing: routerReducer,
  mazes: mazesReducer,
  mazeData: mazeFetchReducer
});