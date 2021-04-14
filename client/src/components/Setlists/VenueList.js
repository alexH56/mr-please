import React from 'react';

import VenuesContainer from './VenuesContainer';

const VenueList = ({ venues, Heading, Container }) => {
  return (
    <>
      <Heading>
        <h1>Venues played by Mr. Please: </h1>
      </Heading>

      <VenuesContainer
        venues={venues}
        Container={Container}
      />
    </>
  );
};

export default VenueList;
