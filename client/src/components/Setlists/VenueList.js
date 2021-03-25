import React from 'react';

import { Link } from 'react-router-dom';

const VenueList = ({ venues, Heading }) => {
  return (
    <>
      <Heading>
        <h1>Venues played by Mr. Please: </h1>
      </Heading>
      {venues
        ? <>
          <ul>
            {venues.map(venue => (
              <li key={venue.id}>
                <Link to={`/setlists/venues/${venue.URLname}`}>
                  {venue.name}
                </Link>
              </li>))}
          </ul>
          </>
        : null}
    </>
  );
};

export default VenueList;
