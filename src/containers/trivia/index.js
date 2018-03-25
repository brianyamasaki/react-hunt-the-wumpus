import React from 'react';
import TrivialModal from '../../components/trivia/triviaModal';

export default () => (
  <div>
    <TrivialModal
      minCorrect={2}
      maxTries={3}
      success={f => console.log('TrivialModal returns ' + f) }
      show={true}
    />
  </div>
);