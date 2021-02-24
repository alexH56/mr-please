import React from 'react';

import { Link } from 'react-router-dom';

const VenueList = ({ venues }) => {
  return (
    <>
      <h1>Venues played by Mr. Please: </h1>
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
