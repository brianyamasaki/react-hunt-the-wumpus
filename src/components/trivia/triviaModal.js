import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

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
    show: true,
    showResult: ''
  };

  componentDidMount() {
    const { fetchTrivia, maxTries } = this.props;
    fetchTrivia(maxTries);
  }

  onClose() {
    this.setState({
      show: false
    });
  }

  hideResult(success) {
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
        show,
        showResult: ''
      });
    } else {
      this.setState({
        questionIndex: questionIndex + 1,
        attempts: attempts + 1,
        showResult: ''
      });
    }
    if (attempts + 1 >= this.props.maxTries) {
      this.props.success(false);
    } 
  }

  succeeded(success) {
    this.setState({
      showResult: success ? 'correct' : 'incorrect'
    });
    setTimeout(() => this.hideResult(success), 3000);
  }

  renderQuestion() {
    const { trivia } = this.props;
    if (trivia.unusedQuestions.length) {
      return (
        <DisplayQuestion 
          question={trivia.unusedQuestions[this.state.questionIndex]} 
          isCorrect={this.succeeded.bind(this)} 
        />
      );
    } else if (trivia.isLoading) {
      return <p>Loading...</p>;
    } else if (trivia.errorMsg) {
      return <p>{trivia.errorMsg}</p>;
    }
  }

  renderFooter() {

    if (!this.state.showResult) {
      return (
        <span className="pull-left">Click on the correct answer</span>
      );
    } else {
      return (
        <span className="pull-left">
          <strong>Answer is {this.state.showResult}</strong>
        </span>
      )
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header closeButton>
            Question {this.state.questionIndex + 1} of {this.props.maxTries}<span className="pull-right">{this.state.correctAnswers} answered correctly</span>
          </Modal.Header>
          {this.renderQuestion()}
          <Modal.Footer>
            {this.renderFooter()} <Button onClick={this.onClose.bind(this)}>Close</Button>
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