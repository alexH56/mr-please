import React from 'react';

import { Link } from 'react-router-dom';

const SongList = ({ songs }) => {
  return (
    <>
      <h1>Songs played by Mr. Please: </h1>
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
