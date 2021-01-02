import React, { useState } from 'react';

const ShowForm = ({ songs }) => {
  const [newShow, setNewShow] = useState([]);

  const handleSongSelect = (e) => {
    console.log(e.target.value);
    let newSong;
    for (const song of songs) {
      if (song.title === e.target.value) {
        newSong = song;
      }
    }
    console.log(newSong);
    const showCopy = newShow.concat(newSong);
    setNewShow(showCopy);
  };

  return (
    <>
      <h1>New Show:</h1>
      <p>{newShow.map(song => song.title).join(', ')}</p>

      <form>
        <select name='song' value='' onChange={handleSongSelect}>
          <option value=''>-add a song here-</option>
          {songs ? songs.map(song => <option key={song.title} value={song.title}>{song.title}</option>) : null}
        </select>
      </form>
    </>
  );
};

export default ShowForm
;
