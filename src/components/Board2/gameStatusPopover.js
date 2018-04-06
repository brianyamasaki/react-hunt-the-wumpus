import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import BatState from '../dashboard/batState';
import WumpusState from '../dashboard/wumpusState';
import PitState from '../dashboard/pitState';

class GameStatusPopover extends Component {
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
        <WumpusState />
        <PitState />
        <BatState />
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
  const { arrows, purse } = state;
  return {
    arrowCount: arrows.count,
    coins: purse.amount
  }
}
export default connect(mapStateToProps)(GameStatusPopover);
