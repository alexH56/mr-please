import React from 'react';

import { useParams } from 'react-router-dom';

import Show from './Show';

const VenuePage = ({ venues, shows }) => {
  const { venueName } = useParams();
  const venue = venues
    ? venues.filter(venue => venue.URLname === venueName)[0]
    : null;

  const showsWithVenue = shows && venue
    ? console.log(shows)
    // shows.filter(show => show.venue.URLname === venueName)
    : null;

  console.log(showsWithVenue);

  return (
    <>
      {venue
        ? <>
          <h1>{venue.name}</h1> <p>Has hosted the following shows:</p>
        </>

        : null}
      {/*
      {showsWithVenue
        ? <>
          {showsWithVenue.map(show => (
            <Show
              key={show.id}
              show={show}
            />
          ))}
          </>
        : null} */}
    </>
  );
};

export default VenuePage;
