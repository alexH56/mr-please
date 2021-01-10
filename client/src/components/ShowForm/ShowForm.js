import React, { useState } from 'react';

import DateForm from './DateForm';
import SetForm from './SetForm';
import VenueForm from './VenueForm';

const ShowForm = ({ songs, venues }) => {
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
        zip: '',
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
  const [numOfSets, setNumOfSets] = useState(1);
  const [encoreClicked, setEncoreClicked] = useState(false);
  const [noteCounter, setNoteCounter] = useState(1);

  const renderSetForms = (numOfSets) => {
    const forms = [];
    for (let i = 1; i <= numOfSets; i++) {
      forms.push(
        <SetForm
          key={i}
          setID={i}
          songs={songs}
          newShow={newShow}
          handleSongSelect={handleSongSelect}
          handleTransitionToggle={handleTransitionToggle}
          handleSongNote={handleSongNote}
        />
      );
    }
    return forms;
  };

  const handleSongSelect = (e, setID) => {
    let newSong;
    for (const song of songs) {
      if (song.title === e.target.value) {
        newSong = song;
      }
    }
    const newSet = newShow.sets[setID].concat(newSong);
    setNewShow({ ...newShow, sets: { ...newShow.sets, [setID]: newSet } });
  };

  const handleTransitionToggle = (song, setID) => {
    if (song.transition) {
      const toggledSong = Object.keys(song).reduce((object, key) => {
        if (key !== 'transition') {
          object[key] = song[key];
        }
        return object;
      }, {});
      const oldSet = newShow.sets[setID];
      const newSet = oldSet
        .slice(0, oldSet.length - 1)
        .concat(toggledSong);

      setNewShow({
        ...newShow,
        sets: {
          ...newShow.sets,
          [setID]: newSet
        }
      });
    } else {
      const toggledSong = { ...song, transition: true };
      const oldSet = newShow.sets[setID];
      const newSet = oldSet
        .slice(0, oldSet.length - 1)
        .concat(toggledSong);

      setNewShow({
        ...newShow,
        sets: {
          ...newShow.sets,
          [setID]: newSet
        }
      });
    }
  };

  const handleDate = (e) => {
    const date = e.target.value;
    const splitDate = date.split('-');
    const dateObj = {
      month: splitDate[1],
      day: splitDate[2],
      year: splitDate[0]
    };

    setNewShow({ ...newShow, date: dateObj });
  };

  const handleVenue = (e) => {
    let venueObj;
    for (const venue of venues) {
      if (venue.name === e.target.value) {
        venueObj = venue;
      }
    }

    setNewShow({ ...newShow, venue: venueObj });
  };

  const handleSongNote = (song, setID, text) => {
    const notedSong = !song.note
      ? {
        ...song,
        note: {
          id: noteCounter,
          text: text
        }
      }
      : {
        ...song,
        note: {
          ...song.note,
          text: text
        }
      };

    const oldSet = newShow.sets[setID];
    const newSet = oldSet
      .slice(0, oldSet.length - 1)
      .concat(notedSong);

    setNewShow({
      ...newShow,
      sets: {
        ...newShow.sets,
        [setID]: newSet
      }
    });

    if (!song.note) { setNoteCounter(noteCounter + 1); }
  };

  return (
    <div>
      <h1>New Show:</h1>

      <DateForm
        handleDate={handleDate}
      />

      <VenueForm
        venues={venues}
        handleVenue={handleVenue}
      />

      {renderSetForms(numOfSets)}

      {encoreClicked
        ? <SetForm
          key='encore'
          setID='encore'
          songs={songs}
          newShow={newShow}
          handleSongSelect={handleSongSelect}
          handleTransitionToggle={handleTransitionToggle}
          handleSongNote={handleSongNote}
          />
        : null}

      {numOfSets < 3
        ? <button onClick={() => setNumOfSets(() => numOfSets + 1)}>Add Set</button>
        : null}

      {numOfSets > 1
        ? <button onClick={() => {
          setNewShow({ ...newShow, sets: { ...newShow.sets, [numOfSets]: [] } });
          setNumOfSets(numOfSets - 1);
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
