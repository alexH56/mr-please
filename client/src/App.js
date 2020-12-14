import React, { useEffect, useState } from 'react';

// component imports
import Show from './components/Show';

// service imports
import retrieval from './services/retrieval';

const App = () => {
  const [songs, setSongs] = useState('');
  const [shows, setShows] = useState('');

  useEffect(() => {
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
      {songs
        ? <>
          <h2>Songs played by Mr. Please: </h2>
          <ul>
            {songs.map(song => (<li key={song._id}>{song.title}</li>))}
          </ul>
          </>
        : null}

      {shows
        ? <>
          {shows.map(show => (
            <Show
              key={show._id}
              info={shows}
            />
          ))}
          </>
        : null}

    </div>
  );
};

export default App;
