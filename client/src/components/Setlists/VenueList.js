import React from 'react';

import VenuesContainer from './VenuesContainer';

const VenueList = ({ venues, Heading }) => {
  return (
    <>
      <Heading>
        <h1>Venues played by Mr. Please: </h1>
      </Heading>

      <VenuesContainer
        venues={venues}
      />
    </>
  );
};

export default VenueList;
