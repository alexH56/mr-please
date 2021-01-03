import React from 'react';

const SetForm = ({ setID, songs, newShow, handleSongSelect }) => (
  <>
    <p>{setID === 'encore' ? 'Encore: ' : `Set ${setID}: `}
      {newShow.sets[setID].map(song => song.title).join(', ')}
    </p>

    <form>
      <select name='song' value='' onChange={(event) => handleSongSelect(event, setID)}>
        <option value=''>-add a song here-</option>
        {songs ? songs.map(song => <option key={song.title} value={song.title}>{song.title}</option>) : null}
      </select>
    </form>
  </>
)
;

export default SetForm;
