import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getPlayerWumpusState, PLAYER_NEAR_WUMPUS, PLAYER_WITH_WUMPUS } from '../../modules/selectors/wumpus';
import { isPlayerInPit } from '../../modules/selectors/pits';
import { isPlayerWithBat } from '../../modules/selectors/bats';
import { playerMove } from '../../modules/player';
import { batMovesPlayer } from '../../modules/bats';

import './cave.css';

class Cave extends Component {
  
  componentDidMount() {
    const {
      match,
      changePage,
      maze
    } = this.props;
    const id = match.params.id;
    if (!id || !maze) {
      changePage('/wumpus');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { changePage, batMovesPlayer, maze, player } = this.props;
    if (nextProps.isPlayerInPit) {
      setTimeout(() => {
        changePage('/wumpus');
      }, 5000);
    }
    if (nextProps.isPlayerWithBat) {
      setTimeout(() => {
        batMovesPlayer(maze, player.currentCave);
        console.log('player gets taken to a new room');
      }, 5000);
    }
  }

  onClickCave(cave) {
    this.props.playerMove(cave);
  }

  renderConnection(connection, i) {
    return (
      <li key={i}>
        <Link to={`/cave/${connection}`} onClick={() => this.onClickCave(connection)}>Move to {connection + 1}</Link>
      </li>
    );
  }

  renderConnections() {
    const { maze, match } = this.props;
    const caveId = match.params.id;
    if (caveId && maze) {
      return (
        <ul className="connections">
          {maze[caveId].connections.map(this.renderConnection.bind(this))}
        </ul>
      );

    }
  }

  renderWumpus() {
    const { wumpusState } = this.props;
    switch(wumpusState) {
      case PLAYER_NEAR_WUMPUS:
        return <p>I smell a Wumpus</p>;
      case PLAYER_WITH_WUMPUS:
        return <p>Wumpus in cave</p>;
      default:
        return;
    }
  }

  renderPitStatus() {
    const { isPlayerInPit } = this.props;
    if (isPlayerInPit) {
      return <p>Player fell into a pit! Game over</p>;
    }
  }

  renderBatStatus() {
    const { isPlayerWithBat } = this.props;
    if (isPlayerWithBat) {
      return <p>Player got taken by bat</p>;
    }
  }

  render() {
    const { match } = this.props;
    const caveId = parseInt(match.params.id, 10) + 1;
    return (
      <div>
        <h1 className="text-center">Cave {caveId}</h1>
        <div className="cave">
          {this.renderConnections()}
        </div>
        {this.renderWumpus()}
        {this.renderPitStatus()}
        {this.renderBatStatus()}
        <div className="text-center">
          <h3><Link to={'/wumpus'}>Back to cave overview</Link></h3>
        </div>
      </div> 
    );
  }
}

const mapStateToProps = state => {
  const { mazeData, wumpus, player } = state;
  return {
    maze: mazeData.maze,
    wumpusCave: wumpus.currentCave,
    wumpusState: getPlayerWumpusState(state),
    isPlayerInPit: isPlayerInPit(state),
    isPlayerWithBat: isPlayerWithBat(state),
    player
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      playerMove,
      batMovesPlayer,
      changePage: url => push(url)
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Cave);