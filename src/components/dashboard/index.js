import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import TriviaModal from '../../components/trivia/triviaModal';
import { arrowsAdd } from '../../modules/arrows'

class Dashboard extends Component {
  state = {
    showModal: false,
    buyArrow: false,
    buySecret: false,
    minCorrect: 2,
    maxTries: 3
  }

  onBuyArrow() {
    this.setState({
      showModal: true,
      buyArrow: true,
      minCorrect: 2,
      maxTries: 3
    });
  }

  onBuySecret() {
    this.setState({
      showModal: true,
      buySecret: true,
      minCorrect: 2,
      maxTries: 3
    })
  }

  onTriviaFinished(isSuccessful) {
    const { arrowsAdd } = this.props;
    if (isSuccessful) {
      if (this.state.buyArrow) {
        arrowsAdd(2);
      } else {
  
      }  
    }
    this.setState({
      showModal: false,
      buyArrow: false,
      buySecret: false
    })
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <TriviaModal 
        minCorrect={this.state.minCorrect}
        maxTries={this.state.maxTries}
        success={f => this.onTriviaFinished(f)}
        show={true}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button onClick={this.onBuyArrow.bind(this)}>Buy Arrow</Button>
          <Button onClick={this.onBuySecret.bind(this)}>Buy Secret</Button>
        </ButtonToolbar>
        {this.renderModal()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, {
  arrowsAdd
})(Dashboard);