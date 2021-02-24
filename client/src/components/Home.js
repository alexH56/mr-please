import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <nav>
        <Link to='/setlists'>Setlists</Link>
      </nav>

      <h1>Hey what's up we're Mr. Please</h1>
    </>
  );
};

export default Home;
