import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayerWumpusState, PLAYER_NEAR_WUMPUS, PLAYER_WITH_WUMPUS } from '../../modules/selectors/wumpus';

class WumpusState extends Component {
  render() {
    let msg;
    switch(this.props.wumpusState) {
      case PLAYER_NEAR_WUMPUS:
        msg = 'I Smell a Wumpus';
        break;
      case PLAYER_WITH_WUMPUS:
        msg = 'Wumpus is HERE';
        break;
      default:
        return null;
    }
    return <h4>{msg}</h4>;
  } 
}

const mapStateToProps = state => {
  return {
    wumpusState: getPlayerWumpusState(state)
  };
}

export default connect (mapStateToProps)(WumpusState);