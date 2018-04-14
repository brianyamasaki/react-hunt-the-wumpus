import { createSelector } from 'reselect';
import { randomInt } from '../../shared';

const getTrivia = (state) => {
  return state.trivia;
};

export const getRandomTriviaHint = createSelector(
  [ getTrivia ],
  (trivia) => {
    const i = randomInt(1, trivia.unusedQuestions.length - 1);
    const tq = trivia.unusedQuestions[i];

    return {
      question: tq.question,
      answer: tq.correct_answer
    };
  }
)
