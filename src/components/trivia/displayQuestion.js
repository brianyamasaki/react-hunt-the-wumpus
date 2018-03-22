import React, { Component } from 'react';
import he from 'he';
import { connect } from 'react-redux';

import { fetchTrivia } from '../../modules/trivia';

import './displayQuestion.css';

class DisplayQuestion extends Component {

  static defaultProps = {
    answeredCorrectly: () =>{}
  }

  componentDidMount() {
    this.props.fetchTrivia(1);
  }

  onClickOption(i) {
    this.props.answeredCorrectly(i === 3);
  }

  renderOptions(option, i) {
    return <li key={i} onClick={() => this.onClickOption(i)}>{he.decode(option)}</li>;
  }

  renderQuestion() {
    const { trivia } = this.props;
    if (trivia.questionStore.length > 0) {
      const question = trivia.questionStore[0];
      // correct answer is always option D
      const answers = question.incorrect_answers.concat(question.correct_answer);
      return (
        <div>
          <p className="question">{he.decode(question.question)}</p>
          <ol>
            {answers.map(this.renderOptions.bind(this))}
          </ol>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="questionContainer">
        {this.renderQuestion()}
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
})(DisplayQuestion);