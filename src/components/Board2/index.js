import React, { Component } from 'react';
import { connect } from 'react-redux';

import backgroundTexture from './background.jpg';
import boardData from './board.json';
import './index.css';
import './hex_white.png';
import './hex_dark.png';
import './hex_light.png';
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

  renderRoom(room, i, stuff) {
    const { imgWidth, imgHeight } = this.state;
    const x = room.x / stuff.widthDenominator * imgWidth;
    const y = room.y / stuff.heightDenominator * imgHeight;
    const size = Math.round(stuff.itemWidth);
    const style = {
      left: Math.round(x - (stuff.itemWidth / 2)),
      top: Math.round(y - (stuff.itemWidth / 2)),
      width: size,
      height: size
    }
    const classes = room.real ? "room" : "room virtual";
    return (
      <div 
        className={classes} 
        key={i}
        style={style}
      >
        <p style={{ marginTop: size / 4}}>{room.iRoom}</p>
      </div>
    );
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
    // find the room in the board data
    const originBoardRoom = stuff.boardRooms.find(room => room.real && room.iRoom === mazeRoom.room + 1);
    const neighbors = originBoardRoom.neighbors;
    // collect all board neighbors in array
    const boardNeighbors = stuff.boardRooms.filter(room => neighbors.indexOf(room.index) !== -1 );
    // find board rooms connected by this mazeRoom in an array
    const connectedNeighbors = boardNeighbors.filter(room => mazeRoom.connections.indexOf(room.iRoom - 1) !== -1 );
    console.log(mazeRoom.room + 1, originBoardRoom.iRoom, boardNeighbors, connectedNeighbors.map(room => room.iRoom));
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
  const { mazeData } = state;
  return {
    maze: mazeData.maze
  };
}

export default connect(mapStateToProps)(Board);
