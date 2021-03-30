import React from 'react';

import SongsContainer from './SongsContainer';

const SongList = ({ songs, Heading }) => {
  return (
    <>
      <Heading>
        <h1>Songs played by Mr. Please: </h1>
      </Heading>
      {songs
        ? <SongsContainer
          songs={songs}
          />
        : null}
    </>
  );
};

export default SongList;
