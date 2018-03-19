import { fetchJson } from '../shared';

export const FETCH_MAZES = "FETCH_MAZES";
export const FETCH_MAZES_SUCCESS = "FETCH_MAZES_SUCCESS";
export const FETCH_MAZES_FAIL = "FETCH_MAZES_FAIL";

const URL = '/data/mazeData.json';

const initialState = {
  obj: '',
  isLoading: false,
  errorMsg: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAZES:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case FETCH_MAZES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        obj: action.payload
      };
    case FETCH_MAZES_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }
    default: 
      return state;
  }
}

export const fetchMazes = () => dispatch => {
  dispatch({
    type: FETCH_MAZES
  });

  fetchJson(URL)
    .then(json => {
      dispatch({
        type: FETCH_MAZES_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_MAZES_FAIL,
        payload: error.message
      });
    })
}