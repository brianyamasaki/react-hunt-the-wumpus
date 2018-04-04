import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameStatusPopover from './gameStatusPopover';
import { playerMove } from '../../modules/player';
import { purseAdd } from '../../modules/purse';
import { playerLegalMoves } from '../../modules/selectors/playerLegalMove';

import backgroundTexture from './background.jpg';
import boardData from './board.json';
import './index.css';
import './hex_white.png';
import './hex_dark.png';
import './hex_light.png';
import './hex_player.png';
import './hex_bat.png';
import './hex_pit.png';
import './hex_wumpus.png';
class Board extends Component {
  state = {
    imgHeight: 0,
    imgWidth: 0
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () =>{
    const { clientWidth, clientHeight } = this.img.element;
    if (clientWidth === 0) {
      return;
    }
    this.setState({
      imgHeight: clientHeight,
      imgWidth: clientWidth
    });
  }

  onImgLoad = (e) => {
    this.img = {
      element: e.target,
      nativeHeight: e.target.height,
      nativeWidth: e.target.width
    }
    this.setState({
      imgHeight: e.target.height,
      imgWidth: e.target.width
    });
    window.addEventListener('resize', this.onWindowResize);
  }

  onClickRoom(e, iRoom) {
    const { playerMove, purseAdd } = this.props;
    playerMove(iRoom);
    purseAdd(1);
  }

  renderRoom(room, i, stuff) {
    const { imgWidth, imgHeight } = this.state;
    const { playerRoom, playerLegalMoves, pitRooms, batRooms, wumpusRoom, debugMode } = this.props;
    const x = room.x / stuff.widthDenominator * imgWidth;
    const y = room.y / stuff.heightDenominator * imgHeight;
    const size = Math.round(stuff.itemWidth);
    const style = {
      left: Math.round(x - (stuff.itemWidth / 2)),
      top: Math.round(y - (stuff.itemWidth / 2)),
      width: size,
      height: size
    }
    const classes = ['room'];
    const isLegalMove = playerLegalMoves.indexOf(room.iRoom) !== -1;
    if (!room.real) {
      classes.push('virtual');
    }
    if (room.iRoom === playerRoom) {
      classes.push('player');
    }
    if (isLegalMove) {
      classes.push('legalMove');
    }
    if (debugMode && room.real) {
      if (pitRooms.indexOf(room.iRoom) !== -1) {
        classes.push('pit');
      }
      if (batRooms.indexOf(room.iRoom) !== -1) {
        classes.push('bat');
      }
      if (wumpusRoom === room.iRoom) {
        classes.push('wumpus');
      }
    }
    const caveRoom = (
      <div 
        className={classes.join(' ')} 
        key={i}
        style={style}
        onClick={(e) => {if (isLegalMove) this.onClickRoom(e, room.iRoom - 1) }}
      >
        <p style={{ marginTop: size / 4}}>{room.iRoom}</p>
      </div>
    );
    if (room.iRoom === playerRoom) {
      return (
        <GameStatusPopover key={i}>
          {caveRoom}
        </GameStatusPopover>
      );  
    } else {
      return caveRoom;
    }
  }

  renderRooms() {
    const cave = boardData;
    const { imgWidth } = this.state;
    if (cave && cave.rooms) {
      const stuff = {
        heightDenominator: boardData.heightDenominator,
        widthDenominator: boardData.widthDenominator,
        itemWidth: imgWidth / boardData.widthDenominator * 1.3
      }
      return boardData.rooms.map((room, i) => this.renderRoom(room, i, stuff));
    }
  }

  renderPath(origin, connection, i, stuff) {
    return (
      <line 
        key={i}
        x1={ origin.x * stuff.widthFactor} 
        y1={ origin.y * stuff.heightFactor} 
        x2={ connection.x * stuff.widthFactor}
        y2={ connection.y * stuff.heightFactor} 
        strokeWidth={stuff.strokeWidth} 
        stroke="white" 
      />
    );
  }

  renderRoomPaths(mazeRoom, i, stuff) {
    // this logic should be a selector!!
    // find the room in the board data
    const originBoardRoom = stuff.boardRooms.find(room => room.real && room.iRoom === mazeRoom.room);
    const neighbors = originBoardRoom.neighbors;
    // collect all board neighbors in array
    const boardNeighbors = stuff.boardRooms.filter(room => neighbors.indexOf(room.index) !== -1 );
    // find board rooms connected by this mazeRoom in an array
    const connectedNeighbors = boardNeighbors.filter(room => mazeRoom.connections.indexOf(room.iRoom - 1) !== -1 );
    return connectedNeighbors.map((connection, index) => this.renderPath(originBoardRoom, connection, i*100+index, stuff));
  }

  renderPaths() {
    const { imgWidth, imgHeight } = this.state;
    const { maze } = this.props;
    const viewBox = `0 0 ${imgWidth} ${imgHeight}`;
    if (imgWidth) {
      const stuff = {
        widthFactor: imgWidth / boardData.widthDenominator,
        heightFactor: imgHeight / boardData.heightDenominator,
        strokeWidth: imgWidth / 30,
        boardRooms: boardData.rooms,
        mazeRooms: maze
      };
      return (
        <div className="paths">
          <svg width={imgWidth} height={imgHeight} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            {maze.map((mazeRoom, i) => this.renderRoomPaths(mazeRoom, i, stuff))}
          </svg>
        </div>
      );
  
    }
  }

  render() {
    return (
      <div 
        className="gameBoard" 
      >
        <img 
          src={backgroundTexture} 
          alt="Board Background" 
          onLoad={this.onImgLoad}
        />
        {this.renderPaths()}
        {this.renderRooms()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { mazeData, player, pits, bats, globalState, wumpus } = state;
  return {
    maze: mazeData.maze,
    playerRoom: player.currentRoom,
    playerLegalMoves: playerLegalMoves(state),
    pitRooms: pits.pitRooms,
    batRooms: bats.batRooms,
    wumpusRoom: wumpus.currentRoom,
    debugMode: globalState.debugMode
  };
}

export default connect(mapStateToProps, {
  playerMove,
  purseAdd
})(Board);
