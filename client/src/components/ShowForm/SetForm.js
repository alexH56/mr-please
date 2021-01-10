import React, { useState } from 'react';

const SetForm = ({ setID, songs, newShow, handleSongSelect, handleTransitionToggle, handleSongNote }) => {
  const [noteText, setNoteText] = useState('');
  const set = newShow.sets[setID];
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
        {set.map((song, index) => (
          <span key={song.title}>
            <a key={song.title}
            // href='#'
            >
              {song.title}
            </a>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === set.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
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
            <button onClick={(e) => { e.preventDefault(); handleSongNote(mostRecentSong, setID, noteText); setNoteText(''); }}>
              add
            </button>
          </form>
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
