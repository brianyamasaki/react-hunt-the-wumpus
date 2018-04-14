import React from 'react'
import { Grid, Row } from 'react-bootstrap';

export default () => (
  <Grid>
    <Row>
    <h1 className="text-center">About Hunt the Wumpus</h1>
    <p>Source code is available at <a href="https://github.com/brianyamasaki/react-hunt-the-wumpus">Github</a>. All tools are free and open source. Instructions on how to build it are in the README</p>
    <p>This is an open source project built using <a href="https://reactjs.org">React</a> with <a href="https://redux.js.org">Redux</a>. </p>
    </Row>
  </Grid>
)