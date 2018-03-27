import { fetchJson } from '../shared';
import { wumpusInit } from '../modules/wumpus';
import { pitsInit } from '../modules/pits';
import { batsInit } from '../modules/bats';

export const FETCH_MAZE = "FETCH_MAZE";
export const FETCH_MAZE_SUCCESS = "FETCH_MAZE_SUCCESS";
export const FETCH_MAZE_FAIL = "FETCH_MAZE_FAIL";

const initialState = {
  maze: '',
  imgUrl: '',
  isLoading: false,
  errorMsg: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAZE:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case FETCH_MAZE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maze: action.payload.maze,
        imgUrl: action.payload.imgUrl
      };
    case FETCH_MAZE_FAIL:
      return {
        ...state,
        isLoading: false,
        maze: [],
        imgUrl: '',
        errorMsg: 'Maze not found'
      }
    default: 
      return state;
  }
}

export const fetchMaze = url => dispatch => {
  dispatch({
    type: FETCH_MAZE
  });

  fetchJson(url)
    .then(json => {
      dispatch({
        type: FETCH_MAZE_SUCCESS,
        payload: json
      });
      const maze = json.maze;
      dispatch(wumpusInit(maze));
      dispatch(pitsInit(maze));
      dispatch(batsInit(maze));
    })
    .catch(error => {
      dispatch({
        type: FETCH_MAZE_FAIL,
        payload: error.message
      });
    })
}