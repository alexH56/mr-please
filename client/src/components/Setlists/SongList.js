import React from 'react';

const SongList = ({ songs }) => {
  return (
    <>
      <h1>Songs played by Mr. Please: </h1>
      {songs
        ? <>
          <ul>
            {songs.map(song => (<li key={song.id}>{song.title}</li>))}
          </ul>
          </>
        : null}
    </>
  );
};

export default SongList;
