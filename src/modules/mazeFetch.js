import { fetchJson } from '../shared';

export const FETCH_MAZE = "FETCH_MAZE";
export const FETCH_MAZE_SUCCESS = "FETCH_MAZE_SUCCESS";
export const FETCH_MAZE_FAIL = "FETCH_MAZE_FAIL";

const initialState = {
  maze: '',
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
        maze: action.payload.maze
      };
    case FETCH_MAZE_FAIL:
      return {
        ...state,
        isLoading: false,
        maze: [],
        errorMsg: action.payload
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
    })
    .catch(error => {
      dispatch({
        type: FETCH_MAZE_FAIL,
        payload: error.message
      });
    })
}