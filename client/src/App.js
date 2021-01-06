import React, { useEffect, useState } from 'react';

// component imports
import Show from './components/Show';
import ShowForm from './components/ShowForm/ShowForm';

// service imports
import retrieval from './services/retrieval';

const App = () => {
  const [songs, setSongs] = useState('');
  const [shows, setShows] = useState('');

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
  },
  []);

  return (
    <div className='App'>
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

      <ShowForm
        songs={songs}
      />

    </div>
  );
};

export default App;
