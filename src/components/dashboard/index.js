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

const coinDescriptions = {
  singular: 'Coin',
  plural: 'Coins'
};

const arrowDescriptions = {
  singular: 'Arrow',
  plural: 'Arrows'
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

  onChangeDebugCheckbox() {
    this.setState({
      debugMode: !this.state.debugMode
    });
    this.props.toggleDebugMode();
  }

  render() {
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
              <Button onClick={this.onBuyArrow.bind(this)}>Buy Arrow</Button>
              <Button onClick={this.onBuySecret.bind(this)}>Buy Secret</Button>
            </ButtonToolbar>
          </div>
          <div className="col-xs-4">
            <ItemCounts descriptions={coinDescriptions} count={this.props.coinCount} />
            <ItemCounts descriptions={arrowDescriptions} count={this.props.arrowCount} />
          </div>
          <div className="col-xs-4">
            <label>Debug Mode <input type="checkbox" onChange={this.onChangeDebugCheckbox.bind(this)} value={this.state.debugMode} /></label>
          </div>
          {this.renderModal()}
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { purse, arrows } = state;
  return {
    coinCount: purse.amount,
    arrowCount: arrows.count
  };
}

export default connect(mapStateToProps, {
  arrowsAdd,
  toggleDebugMode
})(Dashboard);