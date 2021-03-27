import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// component imports
import SongList from './SongList';
import SongPage from './SongPage';
import VenueList from './VenueList';
import VenuePage from './VenuePage';
import ShowsContainer from './ShowsContainer';

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
      const [returnedShows, returnedSongs, returnedVenues] = await Promise.all([
        retrieval.getShows(),
        retrieval.getSongs(),
        retrieval.getVenues()
      ]);

      const sortedShows = [...returnedShows].sort((a, b) => {
        const A = a.date;
        const B = b.date;

        if (A.year !== B.year) {
          return B.year - A.year;
        } else if (A.month !== B.month) {
          return B.month - A.month;
        } else {
          return B.day - A.day;
        }
      });

      setShows(sortedShows);
      setSongs(returnedSongs);
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

  const Heading = styled.header`
    display: flex;
    flex-direction:column;
    align-items: center;
  `;

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
        <Route path='/setlists/songs/:songName'>
          <SongPage
            songs={songs}
            shows={shows}
            Heading={Heading}
          />
        </Route>

        <Route path='/setlists/songs'>
          <SongList
            songs={songs}
            shows={shows}
            Heading={Heading}
          />
        </Route>

        <Route path='/setlists/venues/:venueName'>
          <VenuePage
            venues={venues}
            shows={shows}
            Heading={Heading}
          />
        </Route>

        <Route path='/setlists/venues'>
          <VenueList
            venues={venues}
            shows={shows}
            Heading={Heading}
          />
        </Route>

        <Route path='/setlists'>
          <Heading>
            <h1>Shows performed by Mr. Please: </h1>
          </Heading>
          <ShowsContainer
            shows={shows}
          />
        </Route>
      </Switch>
    </>
  );
};

export default Setlists;
