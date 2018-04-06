import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayerBatState, PLAYER_WITH_BAT, PLAYER_NEAR_BAT } from '../../modules/selectors/bats';

class BatState extends Component {
  render() {
    let msg;
    switch(this.props.batState) {
      case PLAYER_NEAR_BAT:
        msg = 'Bats nearby';
        break;
      case PLAYER_WITH_BAT:
        msg = 'Player got taken by bat';
        break;
      default:
        return null;
    }
    return <h4>{msg}</h4>;
  } 
}

const mapStateToProps = state => {
  return {
    batState: getPlayerBatState(state)
  };
}

export default connect (mapStateToProps)(BatState);