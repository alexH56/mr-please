import React from 'react';

import { useParams } from 'react-router-dom';

const VenuePage = ({ venues, shows }) => {
  const { id } = useParams();
  const venue = venues.filter(venue => venue.URLname === id)[0];

  return (
    <h1>{venue.name}</h1>
  );
};

export default VenuePage;
