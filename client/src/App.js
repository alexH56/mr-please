import React, { useEffect, useState } from 'react';

// component imports
import Show from './components/Show';
import ShowForm from './components/ShowForm/ShowForm';

// service imports
import retrieval from './services/retrieval';

const App = () => {
  const [songs, setSongs] = useState('');
  const [shows, setShows] = useState('');
  const [venues, setVenues] = useState('');

  useEffect(() => {
    console.log('App has loaded');
    retrieval
      .getSongs()
      .then(songs => {
        setSongs(songs);
      });

    retrieval
      .getShows()
      .then(shows => {
        setShows(shows);
      });

    retrieval
      .getVenues()
      .then(songs => {
        setVenues(songs);
      });
  },
  []);

  return (
    <div className='App'>

      <ShowForm
        songs={songs}
        venues={venues}
      />

      <h1>Songs played by Mr. Please: </h1>
      {songs
        ? <>
          <ul>
            {songs.map(song => (<li key={song.id}>{song.title}</li>))}
          </ul>
          </>
        : null}

      <h1>Shows performed by Mr. Please: </h1>
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

      <h1>Venues played by Mr. Please: </h1>
      {venues
        ? <>
          <ul>
            {venues.map(venue => (<li key={venue.id}>{venue.name}</li>))}
          </ul>
          </>
        : null}

    </div>
  );
};

export default App;
