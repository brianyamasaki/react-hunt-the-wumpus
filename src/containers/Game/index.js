import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchMazes } from '../../modules/mazesFetch';
import { fetchMaze } from '../../modules/mazeFetch';

import './index.css';

class Game extends Component {

  componentDidMount() {
    this.props.fetchMazes();
  }

  onClickMaze(evt, i) {
    const { mazes } = this.props;
    this.props.fetchMaze(mazes.mazes[i].url);
  }

  renderMazeCave(cave, i) {
    const connections = cave.exits.map(item => item + 1);
    return (
      <div className="cave" key={i}>
        <Link to={`/cave/${i}`}>
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

  render() {
    return (
      <div className="game">
        <h1 className="text-center">Start Hunting</h1>
        <div className="gameDiv">
          {this.renderMazeCaves()}
        </div>
        {this.renderMazes()}
      </div>        
    );
  }
}

const mapStateToProps = state => {
  const { mazes, mazeData } = state;
  return {
    mazes: mazes.obj,
    isLoading: mazes.isLoading,
    mazeData
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMazes,
      fetchMaze,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);