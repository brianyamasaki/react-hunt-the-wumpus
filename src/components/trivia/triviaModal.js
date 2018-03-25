import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import DisplayQuestion from './displayQuestion';
import { fetchTrivia } from '../../modules/trivia';

type Props = {
  minCorrect: number,
  maxTries: number
};

class AskTrivia extends Component <Props> {
  static defaultProps = {
    minCorrect: 2,
    maxTries: 3,
    success: (f) => console.log(f ? 'success' : 'failed'),
    show: true
  }

  state = {
    questionIndex: 0,
    correctAnswers: 0,
    attempts: 0,
    show: true
  };

  componentDidMount() {
    const { fetchTrivia, maxTries } = this.props;
    fetchTrivia(maxTries);
  }

  succeeded(success) {
    const { attempts, correctAnswers, questionIndex } = this.state;
    let show = true;
    if (success) {
      if (correctAnswers + 1 >= this.props.minCorrect) {
        this.props.success(true);
        show = false;
      }
      this.setState({
        correctAnswers: correctAnswers + 1,
        questionIndex: questionIndex + 1,
        attempts: attempts + 1,
        show
      });
    } else {
      this.setState({
        questionIndex: questionIndex + 1,
        attempts: attempts + 1
      });
    }
    if (attempts + 1 >= this.props.maxTries) {
      this.props.success(false);
    } 
  }

  renderQuestion() {
    const { trivia } = this.props;
    if (trivia.unusedQuestions.length) {
      return <DisplayQuestion question={trivia.unusedQuestions[this.state.questionIndex]} isCorrect={this.succeeded.bind(this)} />
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header>
            Question {this.state.questionIndex + 1} of {this.props.maxTries}
          </Modal.Header>
          {this.renderQuestion()}
          <Modal.Footer>
            Click on the correct answer
          </Modal.Footer>
        </Modal>
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
})(AskTrivia);