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

const Heading = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin: 2rem 0rem; */
    padding: 2rem 7.5%;
    text-align: center;

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 700px;
      margin: 0;
    }
    
    p {
      margin: 1rem 0 0 0;
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
          <Setlists
            Heading={Heading}
          />
        </Route>

        <Route path='/'>
          <Home
            Heading={Heading}
          />
        </Route>
      </Switch>

    </div>
  );
};

export default App;
