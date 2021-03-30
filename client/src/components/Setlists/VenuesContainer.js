import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.main`
        display: flex;
        flex-direction: column;
        align-items: center;

        ul {
          list-style-type: none;
        }
`;

const VenuesContainer = ({ venues }) => {
  const sortedVenues = [...venues].sort((a, b) => (
    a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0
  ));

  return (
    <Container>
      {sortedVenues
        ? <>
          <ul>
            {sortedVenues.map(venue => (
              <li key={venue.id}>
                <Link to={`/setlists/venues/${venue.URLname}`}>
                  {venue.name}
                </Link>
              </li>))}
          </ul>
        </>
        : null}
    </Container>
  );
};

export default VenuesContainer
;
