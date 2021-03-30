import React from 'react';
import styled from 'styled-components';

import Show from './Show';

const Container = styled.main`
        display: flex;
        flex-direction: column;
        align-items: center;
`;

const ShowsContainer = ({ shows }) => {
  return (
    <Container>
      {shows
        ? <>
          {shows.map(show => (
            <Show
              key={show.id}
              show={show}
            />
          ))}
          </>
        : null}
    </Container>
  );
};

export default ShowsContainer;
