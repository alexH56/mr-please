import React from 'react';

import { useParams } from 'react-router-dom';

import Show from './Show';

const SongPage = ({ songs, shows }) => {
  const { songName } = useParams();
  const song = songs
    ? songs.filter(song => song.URLname === songName)[0]
    : null;

  const showsWithSong = shows && song
    ? shows.filter(show => {
      let match = false;
      for (const set in show.sets) {
        if (show.sets[set].some(song => song.URLname === songName)) {
          match = true;
          break;
        }
      }
      return match;
    })
    : null;

  //   console.log(showsWithSong);

  return (
    <>
      {song
        ? <>
          <h1>{song.title}</h1> <p>Has been played at the following shows:</p>
          </>

        : null}

      {showsWithSong
        ? <>
          {showsWithSong.map(show => (
            <Show
              key={show.id}
              show={show}
            />
          ))}
          </>
        : null}
    </>
  );
};

export default SongPage;
