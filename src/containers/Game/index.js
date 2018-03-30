import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { fetchMazes } from '../../modules/mazesFetch';
import { fetchMaze } from '../../modules/mazeFetch';
import { playerMove } from '../../modules/player';
import { fetchTrivia } from '../../modules/trivia';
import Board2 from '../../components/Board2';

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

  renderBoard() {
    const { mazeData } = this.props;
    if (mazeData.imgUrl) {
      return <Board2 />;
    }
  }

  render() {
    return (
      <div className="game">
        <h1 className="text-center">Play</h1>
        <ol>
          <li>Choose a maze</li>
          <li>Click on a white space to move there</li>
        </ol>
        {this.renderMazes()}
        {this.renderBoard()}
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