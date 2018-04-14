import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Button, ButtonToolbar } from 'react-bootstrap';
import ItemCounts from './itemCounts';
import TriviaModal from '../../components/trivia/triviaModal';
import WumpusState from './wumpusState';
import PitState from './pitState';
import BatState from './batState';
import { arrowsAdd } from '../../modules/arrows'
import { toggleDebugMode } from '../../modules/globalState';
import { incrementMove } from '../../modules/player';

const coinDescriptions = {
  singular: 'Coin',
  plural: 'Coins'
};

const arrowDescriptions = {
  singular: 'Arrow',
  plural: 'Arrows'
};

const moveDescriptions = {
  singular: 'Move',
  plural: 'Moves'
};

class Dashboard extends Component {
  state = {
    showModal: false,
    buyArrow: false,
    buySecret: false,
    minCorrect: 2,
    maxTries: 3,
    debugMode: false
  }

  onBuyArrow() {
    this.setState({
      showModal: true,
      buyArrow: true,
      minCorrect: 2,
      maxTries: 3
    });
    this.props.incrementMove();
  }

  onBuySecret() {
    this.setState({
      showModal: true,
      buySecret: true,
      minCorrect: 2,
      maxTries: 3
    });
    this.props.incrementMove();
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

  onChangeDebugCheckbox() {
    this.setState({
      debugMode: !this.state.debugMode
    });
    this.props.toggleDebugMode();
  }

  render() {
    const { isGameOver, coinCount } = this.props;
    return (
      <Grid>
        <Row>
          <div>
            <WumpusState />
            <PitState />
            <BatState />
          </div>
        </Row>
        <Row>
          <div className="col-xs-4">
            <ButtonToolbar>
              <Button 
                onClick={this.onBuyArrow.bind(this)} 
                disabled={isGameOver || coinCount < this.state.minCorrect}
              >
                Buy Arrow
              </Button>
              <Button 
                onClick={this.onBuySecret.bind(this)} 
                disabled={true /*isGameOver || coinCount < this.state.minCorrect */}
              >
                Buy Secret
              </Button>
            </ButtonToolbar>
          </div>
          <div className="col-xs-4">
            <ItemCounts descriptions={coinDescriptions} count={this.props.coinCount} />
            <ItemCounts descriptions={arrowDescriptions} count={this.props.arrowCount} />
            <ItemCounts descriptions={moveDescriptions} count={this.props.moveCount} />
          </div>
          <div className="col-xs-4">
            <label>Debug Mode <input type="checkbox" onChange={this.onChangeDebugCheckbox.bind(this)} value={this.state.debugMode} /></label>
          </div>
          <TriviaModal 
            minCorrect={this.state.minCorrect}
            maxTries={this.state.maxTries}
            success={f => this.onTriviaFinished(f)}
            show={this.state.showModal}
          />
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { purse, arrows, player, globalState } = state;
  return {
    coinCount: purse.amount,
    arrowCount: arrows.count,
    moveCount: player.moveCount,
    isGameOver: globalState.gameOver
  };
}

export default connect(mapStateToProps, {
  arrowsAdd,
  toggleDebugMode,
  incrementMove
})(Dashboard);