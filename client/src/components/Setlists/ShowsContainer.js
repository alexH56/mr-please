import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Show from './Show';

const ShowsContainer = ({ shows }) => {
  const Container = styled.main`
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
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
