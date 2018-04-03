import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { getPlayerWumpusState, PLAYER_NEAR_WUMPUS, PLAYER_WITH_WUMPUS } from '../../modules/selectors/wumpus';
import { getPlayerPitState, PLAYER_IN_PIT, PLAYER_NEAR_PIT } from '../../modules/selectors/pits';
import { getPlayerBatState, PLAYER_WITH_BAT, PLAYER_NEAR_BAT } from '../../modules/selectors/bats';

class GameStatusPopover extends Component {
  renderWumpusState() {
    const { wumpusState } = this.props;

    switch (wumpusState) {
      case PLAYER_NEAR_WUMPUS:
        return <h4>I smell a Wumpus</h4>;
      case PLAYER_WITH_WUMPUS:
        return <h4>Wumpus is HERE</h4>;
      default:
        return;
    }
  }

  renderPitStatus() {
    const { pitState } = this.props;
    switch (pitState) {
      case PLAYER_IN_PIT:
        return <p>Player fell into a pit! Game over</p>;
      case PLAYER_NEAR_PIT:
        return <p>I feel a draft</p>;
      default:
        return;
    }
  }

  renderBatStatus() {
    const { batState } = this.props;
    switch (batState) {
      case PLAYER_NEAR_BAT: 
        return <p>Bats nearby</p>;
      case PLAYER_WITH_BAT:
        return <p>Player got taken by bat</p>;
      default:
        return;
    }
  }

  renderArrowCount() {
    const { arrowCount } = this.props;
    if (arrowCount === 1) {
      return <p>1 arrow remaining</p>;
    }
    return <p>{arrowCount} arrows in quiver</p>;
  }

  renderCoinCount() {
    const { coins } = this.props;
    if (coins === 1) {
      return <p>1 coin remaining</p>;
    }
    return <p>{coins} coins in purse</p>;
  }

  renderOverlay() {
    return (
      <Popover id="gameStatus">
        {this.renderWumpusState()}
        {this.renderPitStatus()}
        {this.renderBatStatus()}
        {this.renderArrowCount()}
        {this.renderCoinCount()}
      </Popover>
    );
  }

  render() {
    return (
      <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={this.renderOverlay()}>
        {this.props.children}
      </OverlayTrigger >
    )
  }
}
const mapStateToProps = state => {
  const { wumpus, arrows, purse } = state;
  return {
    wumpusRoom: wumpus.currentRoom,
    wumpusState: getPlayerWumpusState(state),
    pitState: getPlayerPitState(state),
    batState: getPlayerBatState(state),
    arrowCount: arrows.count,
    coins: purse.amount
  }
}
export default connect(mapStateToProps)(GameStatusPopover);
