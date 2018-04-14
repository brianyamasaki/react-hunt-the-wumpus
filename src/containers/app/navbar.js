import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Menus = () => (
  <Navbar inverse >
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Wumpus</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/wumpus">
          Play
        </NavItem>
        <NavItem eventKey={2} href="/about">
          About
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menus;