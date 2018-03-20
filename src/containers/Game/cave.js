import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import './cave.css';

class Cave extends Component {
  
  componentDidMount() {
    const {
      match,
      changePage,
      mazeData
    } = this.props;
    const id = match.params.id;
    if (!id || !mazeData || !mazeData.maze) {
      changePage('/wumpus');
    }
  }

  renderConnection(connection, i) {
    return (
      <li key={i}>
        <Link to={`/cave/${connection}`}>Move to {connection + 1}</Link>
      </li>
    );
  }

  renderConnections() {
    const { mazeData, match } = this.props;
    const caveId = match.params.id;
    if (caveId && mazeData && mazeData.maze) {
      return (
        <ul className="connections">
          {mazeData.maze[caveId].connections.map(this.renderConnection.bind(this))}
        </ul>
      );

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
        <div className="text-center">
          <Link to={'/wumpus'}>Back to cave overview</Link>
        </div>
      </div> 
    );
  }
}

const mapStateToProps = state => {
  const { mazeData } = state;
  return {
    mazeData
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: url => push(url)
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Cave);