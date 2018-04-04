import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import { fetchMazes } from '../../modules/mazesFetch';
import { fetchMaze } from '../../modules/mazeFetch';
import { playerMove } from '../../modules/player';
import { fetchTrivia } from '../../modules/trivia';
import Board2 from '../../components/Board2';
import Dashboard from '../../components/dashboard';

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
      <li key={i}>
        <Button bsStyle="primary" onClick={(e) => this.onClickMaze(e, i)}>
          {maze.title}
        </Button>
      </li>
    );
  }

  renderMazes() {
    const { mazes, mazeData } = this.props;
    const instruction = !mazeData.maze ? 'Choose a Maze' : 'Mazes';
    if (mazes) {
      return (
        <div>
          <h3 className="text-center">{instruction}</h3>
          <ul>
            {mazes.mazes.map(this.renderMazeTitle.bind(this))}
          </ul>
        </div>
      );
    }
    return
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

  renderDashboard() {
    const { mazeData } = this.props;
    if (mazeData.imgUrl) {
      return <Dashboard />;
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
        <h1 className="text-center">Play Hunt the Wumpus</h1>
        {this.renderMazes()}
        {this.renderMazesState()}
        {this.renderDashboard()}
        {this.renderBoard()}
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
    wumpusCave: wumpus.currentRoom
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