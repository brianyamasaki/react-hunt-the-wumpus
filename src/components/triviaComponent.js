import React, { Component } from 'react';
import he from 'he';
import { connect } from 'react-redux';
import { fetchTrivia } from '../modules/trivia';

class Trivia extends Component {
  componentDidMount() {
    this.props.fetchTrivia();
  }

  renderOptions(option, i) {
    return <li key={i}>{he.decode(option)}</li>;
  }

  renderQuestion(question, i) {
    const answers = question.incorrect_answers.concat(question.correct_answer);
    return (
      <div key={i}>
        <p>{he.decode(question.question)}</p>
        <ol>
          {answers.map(this.renderOptions.bind(this))}
        </ol>
      </div>
    )
  }

  renderQuestions() {
    const { trivia } = this.props;
    if (trivia.questions && trivia.questions.length) {
      return trivia.questions.map(this.renderQuestion.bind(this));
    }
  }
  
  render() {
    return (
      <div>
        {this.renderQuestions()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { trivia } = state;
  return {
    trivia
  }
}

export default connect(mapStateToProps, {
fetchTrivia
})(Trivia);