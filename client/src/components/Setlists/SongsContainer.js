import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SongsContainer = ({ songs, Container }) => {
  const sortedSongs = [...songs].sort((a, b) => (
    a.title > b.title
      ? 1
      : a.title < b.title
        ? -1
        : 0
  ));

  return (
    <Container>
      {sortedSongs
        ? <ul>
          {sortedSongs.map(song => (
            <li key={song.id}>
              <Link to={`/setlists/songs/${song.URLname}`}>
                {song.title}
              </Link>
            </li>))}
          </ul>
        : null}
    </Container>
  );
};

export default SongsContainer;
