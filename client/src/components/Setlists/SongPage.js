import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import ShowsContainer from './ShowsContainer';

const SongPage = ({ songs, shows, Heading }) => {
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
          <Heading>
            <h1>{song.title}</h1>
            <p>Has been played at the following shows:</p>
          </Heading>

          <ShowsContainer
            shows={showsWithSong}
          />
          </>

        : null}
    </>
  );
};

export default SongPage;
