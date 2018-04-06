import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Button } from 'react-bootstrap';

const Home = props => (
  <Grid>
    <Row>
      <h1 className="text-center">Welcome to Hunt the Wumpus</h1>
      <div className="col-sm-6">
        <h4 className="text-center">History</h4>
        <p>
          Hunt the Wumpus is an early computer game, based on a simple hide and seek format featuring a mysterious monster 
          (the Wumpus) that lurks deep inside a network of rooms. 
        </p>
      </div>
      <div className="col-sm-6">
        <h4 className="text-center">The Maze</h4>
        <p>The Wumpus lives in a cave of 30 rooms.  The rooms are hexagonal.  Each room has up to 3 tunnels leading to other rooms.  The rooms on the edges can be connected to the rooms on the opposite edge. </p>
      </div>
      
      <div className="text-center">
        <Button onClick={() => props.changePage()}>Let Me Play</Button>
      </div>
    </Row>
  </Grid>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/wumpus')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(Home)