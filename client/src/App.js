import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom';

// component imports
import Home from './components/Home';
import Setlists from './components/Setlists/Setlists';

const App = () => {
  return (
    <div className='App'>

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
