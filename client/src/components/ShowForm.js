import React, { useState } from 'react';

import SetForm from './SetForm';

const ShowForm = ({ songs }) => {
  const blankSet = {
    date: {
      month: 1,
      day: 1,
      year: 2001
    },
    venue: {
      name: '',
      location: {
        street: '',
        street2: '',
        city: '',
        state: '',
        country: ''
      }
    },
    sets: {
      1: [],
      2: [],
      3: [],
      encore: []
    },
    showNotes: '',
    countsForStats: true,
    audioLink: ''
  };
  const [newShow, setNewShow] = useState(blankSet);
  const [counter, setCounter] = useState(1);
  const [encoreClicked, setEncoreClicked] = useState(false);

  const renderSetForms = (counter) => {
    const content = [];
    for (let i = 1; i <= counter; i++) {
      content.push(
        <SetForm
          key={i}
          setID={i}
          songs={songs}
          newShow={newShow}
          handleSongSelect={handleSongSelect}
        />
      );
    }
    return content;
  };

  const handleSongSelect = (e, setID) => {
    console.log(e.target.value);
    let newSong;
    for (const song of songs) {
      if (song.title === e.target.value) {
        newSong = song;
      }
    }
    const newSet = newShow.sets[setID].concat(newSong);
    setNewShow({ ...newShow, sets: { ...newShow.sets, [setID]: newSet } },
      console.log(newShow));
  };

  return (
    <div>
      <h1>New Show:</h1>

      {renderSetForms(counter)}

      {encoreClicked
        ? <SetForm
          key='encore'
          setID='encore'
          songs={songs}
          newShow={newShow}
          handleSongSelect={handleSongSelect}
        />
        : null}

      {counter < 3
        ? <button onClick={() => setCounter(counter + 1)}>Add Set</button>
        : null}

      {counter > 1
        ? <button onClick={() => {
          setNewShow({ ...newShow, sets: { ...newShow.sets, [counter]: [] } });
          setCounter(counter - 1);
        }}
        >
        Remove Set
        </button>
        : null}

      <button onClick={() => {
        setNewShow({ ...newShow, sets: { ...newShow.sets, encore: [] } });
        setEncoreClicked(!encoreClicked);
      }}
      >
        {encoreClicked ? 'Remove Encore' : 'Add Encore'}
      </button>

    </div>
  );
};

export default ShowForm
;
