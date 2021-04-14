import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

// component imports
import Home from './components/Home';
import Setlists from './components/Setlists/Setlists';

const Navbar = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  background-color: black;

  display: flex;
  justify-content: space-between;

  padding: .75rem 7.5%;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const App = () => {
  return (
    <div className='App'>

      <Navbar>
        <Link to='/setlists'>Setlists</Link>
        <br />
        <Link to='/setlists/songs'>Songs</Link>
        <br />
        <Link to='/setlists/venues'>Venues</Link>
      </Navbar>

      <Switch>
        <Route path='/setlists'>
          <Setlists />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>

    </div>
  );
};

export default App;
