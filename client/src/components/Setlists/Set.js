import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SetWrapper = styled.div`
  a {
  color: palevioletred;
  text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Set = ({ songs, value }) => {
  // 'value' prop denotes set order (i.e. set 1, 2, 3, or encore)
  return (
    <SetWrapper>
      <p>{value === 'encore' ? 'Encore:' : `Set ${value}:`} {songs.map((song, index) => (
        <span key={song.title}>
          <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
            {song.title}
          </Link>
          {song.note ? <sup>[{song.note.id}]</sup> : null}
          {index === songs.length - 1 ? null : (song.transition ? ' > ' : ', ')}
        </span>
      ))}
      </p>
    </SetWrapper>
  );
};

export default Set;
