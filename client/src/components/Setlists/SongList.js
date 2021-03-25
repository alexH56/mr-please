import React from 'react';

import { Link } from 'react-router-dom';

const SongList = ({ songs, Heading }) => {
  return (
    <>
      <Heading>
        <h1>Songs played by Mr. Please: </h1>
      </Heading>
      {songs
        ? <>
          <ul>
            {songs.map(song => (
              <li key={song.id}>
                <Link to={`/setlists/songs/${song.URLname}`}>
                  {song.title}
                </Link>
              </li>))}
          </ul>
        </>
        : null}
    </>
  );
};

export default SongList;
