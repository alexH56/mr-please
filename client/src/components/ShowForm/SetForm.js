import React from 'react';

// utility imports
import joinDynamically from '../../services/joinDynamically';

const SetForm = ({ setID, songs, newShow, handleSongSelect, handleTransitionToggle }) => {
  const set = newShow.sets[setID];
  const parsedSet = set.length > 0 ? joinDynamically(set) : null;
  const mostRecentSong = set[set.length - 1];
  const buttonContent = set.length > 0
    ? mostRecentSong.transition
      ? ','
      : '>'
    : null;

  return (
    <div>
      <p>{setID === 'encore' ? 'Encore: ' : `Set ${setID}: `}
        {/* create dynamic joiner function */}
        {parsedSet}
      </p>

      {set.length > 0
        ? <button onClick={() => handleTransitionToggle(mostRecentSong, setID)}>{buttonContent}</button>
        : null}

      <form>
        <select name='song' value='' onChange={(event) => handleSongSelect(event, setID)}>
          <option value=''>-add a song here-</option>
          {songs ? songs.map(song => <option key={song.title} value={song.title}>{song.title}</option>) : null}
        </select>
      </form>
    </div>
  );
}
;

export default SetForm;
