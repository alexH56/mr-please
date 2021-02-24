import React from 'react';

const VenueList = ({ venues }) => {
  return (
    <>
      <h1>Venues played by Mr. Please: </h1>
      {venues
        ? <>
          <ul>
            {venues.map(venue => (<li key={venue.id}>{venue.name}</li>))}
          </ul>
          </>
        : null}
    </>
  );
};

export default VenueList;
