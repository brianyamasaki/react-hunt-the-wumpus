import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchMazes } from '../../modules/mazesFetch';
import { fetchMaze } from '../../modules/mazeFetch';
import { playerMove } from '../../modules/player';
import { fetchTrivia } from '../../modules/trivia';

import './index.css';

class Game extends Component {

  componentDidMount() {
    const { fetchMazes, fetchTrivia } = this.props;
    fetchMazes();
    fetchTrivia(40);
  }

  onClickMaze(evt, i) {
    const { mazes, fetchMaze } = this.props;
    fetchMaze(mazes.mazes[i].url);
  }

  onClickCave(evt, i) {
    const { playerMove } = this.props;
    playerMove(i);
  }

  renderWumpus(iCave) {
    const { wumpusCave } = this.props;
    if (wumpusCave === iCave) {
      return <p className="text-center">Wumpus</p>;
    }
  }

  renderMazeCave(cave, i) {
    const connections = cave.connections.map(item => item + 1);
    return (
      <div className="cave" key={i}>
        <Link to={`/cave/${i}`} onClick={(e) => this.onClickCave(e, i)} >
          <p className="text-center">Cave {i + 1}</p>
          <p className="text-center">Leads to {connections.join(', ')}</p>
        </Link>
      </div>
    )
  }
  renderMazeCaves() {
    const { mazeData } = this.props;
    if (mazeData && mazeData.maze) {
      return mazeData.maze.map(this.renderMazeCave.bind(this))
    }
  }

  renderMazeTitle(maze, i) {
    return (
      <li key={i} onClick={(e) => this.onClickMaze(e, i)}>{maze.title}</li>
    );
  }

  renderMazes() {
    const { mazes } = this.props;
    if (mazes) {
      return (
        <ul>
          {mazes.mazes.map(this.renderMazeTitle.bind(this))}
        </ul>
      );
    }
    return <p />;
  }

  renderMazesState() {
    const { mazeData } = this.props;
    if (mazeData) {
      if (mazeData.isLoading) {
        return <h3 className="text-center">Loading...</h3>
      } else if (mazeData.errorMsg) {
        return <h3 className="text-center">{mazeData.errorMsg}</h3>;
      }
    }
  }

  render() {
    return (
      <div className="game">
        <h1 className="text-center">Start Hunting</h1>
        <div className="gameDiv">
          {this.renderMazeCaves()}
        </div>
        {this.renderMazes()}
        {this.renderMazesState()}
      </div>        
    );
  }
}

const mapStateToProps = state => {
  const { mazes, mazeData, wumpus } = state;
  return {
    mazes: mazes.obj,
    isLoading: mazes.isLoading,
    mazeData,
    wumpusCave: wumpus.currentCave
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTrivia,
      fetchMazes,
      fetchMaze,
      playerMove,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);