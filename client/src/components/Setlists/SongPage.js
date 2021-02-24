import React from 'react';

import { useParams } from 'react-router-dom';

const SongPage = ({ songs, shows }) => {
  const { id } = useParams();
  const song = songs.filter(song => song.URLname === id)[0];

  return (
    <h1>{song.title}</h1>
  );
};

export default SongPage;
