import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Button } from 'react-bootstrap';

const Home = props => (
  <Grid>
    <Row>
    <h1 className="text-center">Hunt the Wumpus</h1>
    <p>Welcome to Hunt The Wumpus!</p>
    <p>Game introduction goes here</p>
    <div className="text-center">
      <Button onClick={() => props.changePage()}>Play</Button>
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