import { fetchJson } from '../shared';

export const FETCH_TRIVIA = "FETCH_TRIVIA";
export const FETCH_TRIVIA_SUCCESS = "FETCH_TRIVIA_SUCCESS";
export const FETCH_TRIVIA_FAIL = "FETCH_TRIVIA_FAIL";
export const USE_TRIVIA_QUESTION = "USE_TRIVIA_QUESTION";

const URL = 'https://opentdb.com/api.php';
const initialState = {
  questionStore: [],
  question: '',
  unusedQuestions: [],
  isLoading: false,
  errorMsg: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIVIA:
      return {
        ...state,
        isLoading: true,
        errorMsg: ''
      };
    case FETCH_TRIVIA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionStore: action.payload.results,
        unusedQuestions: action.payload.results.slice()
      };
    case FETCH_TRIVIA_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }
    case USE_TRIVIA_QUESTION:
      // make one question current and remove from unused list
      const qi = Math.trunc(Math.random() * state.unusedQuestions);
      return {
        ...state,
        question: state.unusedQuestions[qi],
        unusedQuestions: state.unusedQuestions.filter((question, i) => i !== qi)
      };
    default: 
      return state;
  }
}

export const fetchTrivia = (count = 10) => dispatch => {
  dispatch({
    type: FETCH_TRIVIA
  });

  const params = [
    `amount=${count}`,
    'difficulty=easy',
    'type=multiple'
  ]

  fetchJson(`${URL}?${params.join('&')}`)
    .then(json => {
      dispatch({
        type: FETCH_TRIVIA_SUCCESS,
        payload: json
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_TRIVIA_FAIL,
        payload: error.message
      });
    })
}

export const useTriviaQuestion = () => {
  return {
    type: USE_TRIVIA_QUESTION,
  }
}