import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Game from '../Game';
import Cave from '../Game/cave';
import NavBar from './navbar';

import './index.css';

const App = () => (
  <div className="app container-fluid">
    <NavBar />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/wumpus" component={Game} />
      <Route exact path="/cave/:id" component={Cave} />
    </main>
  </div>
)

export default App;