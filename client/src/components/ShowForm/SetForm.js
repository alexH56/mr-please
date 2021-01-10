import React, { useState } from 'react';

// utility imports
import joinDynamically from '../../services/joinDynamically';

const SetForm = ({ setID, songs, newShow, handleSongSelect, handleTransitionToggle, handleSongNote }) => {
  const [noteText, setNoteText] = useState('');
  const set = newShow.sets[setID];
  const parsedSet = set.length > 0 ? joinDynamically(set) : null;
  const mostRecentSong = set[set.length - 1];
  const toggleContent = set.length > 0
    ? mostRecentSong.transition
      ? ','
      : '>'
    : null;

  const handleText = (e) => {
    setNoteText(e.target.value);
  };

  return (
    <div>
      <p>{setID === 'encore' ? 'Encore: ' : `Set ${setID}: `}
        {parsedSet}
      </p>

      {set.length > 0
        ? <>
          <button onClick={() => handleTransitionToggle(mostRecentSong, setID)}>{toggleContent}</button>
          <form>
            <input
              type='text'
              value={noteText}
              onChange={(e) => handleText(e)}
              placeholder='Add a note to current song'
            />
          </form>
          <button onClick={() => { handleSongNote(mostRecentSong, setID, noteText); setNoteText(''); }}>
              add song note
          </button>
        </>
        : null}

      <form>
        <select name='song' value='' onChange={(event) => handleSongSelect(event, setID)}>
          <option value=''>- add a song -</option>
          {songs ? songs.map(song => <option key={song.title} value={song.title}>{song.title}</option>) : null}
        </select>
      </form>
    </div>
  );
}
;

export default SetForm;
