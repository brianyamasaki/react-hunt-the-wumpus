import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayerPitState, PLAYER_IN_PIT, PLAYER_NEAR_PIT } from '../../modules/selectors/pits';

class PitState extends Component {
  render() {
    let msg;
    switch(this.props.pitState) {
      case PLAYER_NEAR_PIT:
        msg = 'I feel a draft';
        break;
      case PLAYER_IN_PIT:
        msg = 'Player fell into a pit! Game over';
        break;
      default:
        return null;
    }
    return <h4>{msg}</h4>;
  } 
}

const mapStateToProps = state => {
  return {
    pitState: getPlayerPitState(state)
  };
}

export default connect (mapStateToProps)(PitState);