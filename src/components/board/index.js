import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';

const offsetXYFromParent = (clientX, clientY, offsetParent) => {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

  const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
  const y = clientY + offsetParent.scrollTop - offsetParentRect.top;

  return {x, y};
}

const caves = [
  {
    x: 0.1920,
    y: 0.1975
  },
  {
    x: 0.3135,
    y: 0.2600
  },
  {
    x: 0.4365,
    y: 0.1975
  },
  {
    x: 0.5580,
    y: 0.2600
  },
  {
    x: 0.6800,
    y: 0.1975
  },
  {
    x: 0.7945,
    y: 0.2600
  },
  { //5
    x: 0.7945,
    y: 0.3975
  },
  {
    x: 0.1920,
    y: 0.3317
  },
  {
    x: 0.3135,
    y: 0.3975
  },
  {
    x: 0.4365,
    y: 0.3317
  },
  {
    x: 0.5580,
    y: 0.3975
  },
  {
    x: 0.6800,
    y: 0.3317
  },
  {
    x: 0.7945,
    y: 0.3975
  }

];

class Board extends Component { 
  state = {
    imgHeight: 0,
    imgWidth: 0
  };

  onWindowResize() {
    const { clientWidth, clientHeight } = this.img.element;
    if (clientWidth === 0) {
      return;
    }
    this.setState({
      imgHeight: clientHeight,
      imgWidth: clientWidth
    });
  }

  onImgLoad(e) {
    this.img = {
      element: e.target,
      nativeHeight: e.target.height,
      nativeWidth: e.target.width
    }
    this.setState({
      imgHeight: e.target.height,
      imgWidth: e.target.width
    });
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onMouseDown(e) {
    const {x, y} = offsetXYFromParent(e.clientX, e.clientY, e.target.parentElement);
    
    console.log(y / this.state.imgHeight, x / this.state.imgWidth);
  }

  renderCave(cave, i) {
    const width = this.state.imgWidth;
    const height = this.state.imgHeight;
    const x = cave.x * width;
    const y = cave.y * height;
    const radius = .054 * height;
    return (
      <div 
        className="cave" 
        key={i} 
        style={{
          width: radius * 2, 
          height: radius * 2,
          top: (y - radius),
          left: (x - radius),
          borderRadius: radius
        }}
      />
    );
  }

  renderCaves() {
    return caves.map(this.renderCave.bind(this));
  }

  render() {
    const { imgUrl } = this.props;
    return (
      <div className="gameBoard">
        <img 
          src={imgUrl}
          onMouseUp={this.onMouseDown.bind(this)}
          alt="Board" 
          onLoad={this.onImgLoad.bind(this)}
        />
        {this.renderCaves()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { mazeData } = state;

  return { 
    maze: mazeData.maze,
    imgUrl: mazeData.imgUrl
  }
}

export default connect(mapStateToProps)(Board);
