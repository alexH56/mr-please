import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Heading = styled.h3`
    margin-top: 0;

    a {
      color: currentColor;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
`;

const ShowHeading = ({ date, venue }) => {
  const { name, URLname = '', location: { city, state } } = venue;

  return (
    <Heading>
      {`${date} - `}
      <Link to={`/setlists/venues/${URLname}`}>
        {name}
      </Link>
      {', '}
      <Link to={`/setlists/venues/${URLname}`}>
        {city}
      </Link>
      {', '}
      <Link to={`/setlists/venues/${URLname}`}>
        {state}
      </Link>
    </Heading>
  );
};

export default ShowHeading;
