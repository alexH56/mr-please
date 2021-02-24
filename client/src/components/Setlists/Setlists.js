import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// component imports
import Show from './Show';
import SongList from './SongList';
import SongPage from './SongPage';
import VenueList from './VenueList';
import VenuePage from './VenuePage';

// import ShowForm from './components/ShowForm/ShowForm';

// service imports
import retrieval from '../../services/retrieval';
// import posting from '../../services/posting';

const Setlists = () => {
  const [songs, setSongs] = useState('');
  const [shows, setShows] = useState('');
  const [venues, setVenues] = useState('');

  useEffect(() => {
    // retrieves all band-related data upon page load
    const fetchBandData = async () => {
      const [returnedSongs, returnedShows, returnedVenues] = await Promise.all([
        retrieval.getSongs(),
        retrieval.getShows(),
        retrieval.getVenues()
      ]);

      setSongs(returnedSongs);
      setShows(returnedShows);
      setVenues(returnedVenues);
    };

    fetchBandData();
  },
  []);

  // "handleNewShow" function only necessary for ShowForm. Currently not user-facing
  //
  // const handleNewShow = (show) => {
  //   posting
  //     .addShow(show)
  //     .then(returnedShow => {
  //       console.log(returnedShow);
  //       setShows(shows.concat(returnedShow));
  //     });
  // };

  return (
    <>
      <nav>
        <Link to='/setlists'>Setlists</Link>
        <br />
        <Link to='/setlists/songs'>Songs</Link>
        <br />
        <Link to='/setlists/venues'>Venues</Link>
      </nav>

      <Switch>
        <Route path='/setlists/songs/:id'>
          <SongPage
            songs={songs}
            shows={shows}
          />
        </Route>

        <Route path='/setlists/songs'>
          <SongList
            songs={songs}
            shows={shows}
          />
        </Route>

        <Route path='/setlists/venues/:id'>
          <VenuePage
            venues={venues}
            shows={shows}
          />
        </Route>

        <Route path='/setlists/venues'>
          <VenueList
            venues={venues}
            shows={shows}
          />
        </Route>

        <Route path='/setlists'>
          <h1>Shows performed by Mr. Please: </h1>
          {shows
            ? <>
              {shows.map(show => (
                <Show
                  key={show.id}
                  show={show}
                />
              ))}
            </>
            : null}
        </Route>
      </Switch>
    </>
  );
};

export default Setlists;
