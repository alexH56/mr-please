import React from 'react';

import { useParams } from 'react-router-dom';

import ShowsContainer from './ShowsContainer';

const VenuePage = ({ venues, shows }) => {
  const { venueName } = useParams();
  const venue = venues
    ? venues.filter(venue => venue.URLname === venueName)[0]
    : null;

  const showsWithVenue = shows && venue
    ? shows.filter(show => show.venue.name === venue.name)
    : null;

  return (
    <>
      {venue
        ? <>
          <h1>{venue.name}</h1>
          <p>Has hosted the following shows:</p>

          <ShowsContainer
            shows={showsWithVenue}
          />
        </>

        : null}

    </>
  );
};

export default VenuePage;
