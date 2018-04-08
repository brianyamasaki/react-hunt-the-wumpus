import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { isOutOfCoin } from '../../modules/selectors/gameOver';
import { gameOver } from '../../modules/globalState';

class GameOverModal extends Component {
  state = {
    show: false
  };

  componentWillReceiveProps(nextProps) {
    const { gameOver } = this.props;
    if (nextProps.isOutOfCoin !== this.props.isOutOfCoin) {
      gameOver('You ran out of coins');
    }
    if (nextProps.isGameOver !== this.state.show) {
      this.setState({
        show: !this.state.show
      });
    }
  }

  onClickClose() {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header closeButton>
            <h2>Game Over</h2>
          </Modal.Header>
            {this.props.message}
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onClickClose.bind(this)}>
              Dummy Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { globalState } = state;
  return {
    isOutOfCoin: isOutOfCoin(state),
    isGameOver: globalState.gameOver,
    message: globalState.gameOverMessage
  };
}
export default connect(mapStateToProps, {
  gameOver
})(GameOverModal);