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
        <p style={{ marginTop: size / 4}}>{room.iCave}</p>
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
        {this.renderRooms()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps)(Board);
