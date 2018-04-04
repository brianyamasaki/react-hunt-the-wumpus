import React, { Component } from 'react';
import he from 'he';
import { connect } from 'react-redux';
import { purseSubtract } from '../../modules/purse';
import { gameOver } from '../../modules/gameOver';
import { isGameOver } from '../../modules/selectors/gameOver'

import './displayQuestion.css';

class DisplayQuestion extends Component {
  static defaultProps = {
    isCorrect: () =>{}
  }

  state = {
    question: ''
  };

  componentDidMount() {
    const { question, purseSubtract } = this.props;
    if (question) {
      this.setState({
        question
      });
      purseSubtract(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isGameOver, gameOver } = this.props;
    if (nextProps.question !== this.state.question) {
      this.setState({
        question: nextProps.question
      });
      this.props.purseSubtract(1);
    }
    if (isGameOver) {
      gameOver('You ran out of coins');
    }
    
  }

  onClickOption(i) {
    this.props.isCorrect(i === 3);
  }

  renderOptions(option, i) {
    return <li key={i} onClick={() => this.onClickOption(i)}>{he.decode(option)}</li>;
  }

  renderQuestion() {
    const { question } = this.state;
    if (question) {
      // correct answer is always option 4
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
  return {
    isGameOver: isGameOver(state)
  }
}

export default connect(mapStateToProps, {
  purseSubtract,
  gameOver,
  isGameOver
})(DisplayQuestion);