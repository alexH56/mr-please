import React, { useEffect, useState } from 'react';

// component imports
import Show from './components/Show';

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
        console.log(songs);
        setSongs(songs);
      });

    retrieval
      .getShows()
      .then(shows => {
        console.log(shows);
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
            {songs.map(song => (<li key={song._id}>{song.title}</li>))}
          </ul>
          </>
        : null}

      <h1>Shows performed by Mr. Please: </h1>
      {shows
        ? <>

          {shows.map(show => (
            <Show
              key={show._id}
              info={show}
            />
          ))}
          </>
        : null}

    </div>
  );
};

export default App;
