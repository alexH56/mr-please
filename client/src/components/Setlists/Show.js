import React from 'react';
import styled from 'styled-components';

import ShowHeading from './ShowHeading';
import Set from './Set';

const Card = styled.div`
    background: papayawhip;
    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 40px;

    p {
      margin-bottom: 0;
    }

    a {
      color: palevioletred;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    ul {
      margin-bottom: 0;
      padding: 0;
      list-style-type: none;      
    }

    @media (min-width: 400px) {
      width: 525px;
    }
  `;

const Show = ({ show }) => {
  const { month, day, year } = show.date;
  const date = `${month}/${day}/${year}`;

  const venue = show.venue;

  const setOne = show.sets[1];
  const setTwo = show.sets[2];
  const setThree = show.sets[3];
  const encore = show.sets.encore;

  const showNotes = show.showNotes;

  const songNotes = (() => {
    let noteArray = [];
    for (const set in show.sets) {
      const noteContent = show.sets[set]
        .filter(show => show.note)
        .map(show => show.note);
      noteArray = noteArray.concat(noteContent);
    }
    return noteArray;
  })();

  return (
    <Card>
      <ShowHeading
        date={date}
        venue={venue}
      />

      {/* <p>Set One: {setOne.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setOne.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p> */}

      {setOne.length > 0
        ? <Set
          songs={setOne}
          value={1}
          />

        : null}

      {/* <p>Set Two: {setTwo.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setTwo.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p> */}

      {setTwo.length > 0
        ? <Set
          songs={setTwo}
          value={2}
          />

        : null}

      {/* <p>Set Three: {setOne.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setOne.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p> */}

      {setThree.length > 0
        ? <Set
          songs={setThree}
          value={3}
          />

        : null}

      {/* <p>Encore: {encore.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === encore.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p> */}

      {encore.length > 0
        ? <Set
          songs={show.sets.encore}
          value={encore}
          />

        : null}

      {songNotes.length > 0
        ? <ul>
          {songNotes.map(note => (
            <li key={note.id}>
              {`[${note.id}] - ${note.text}`}
            </li>
          ))}
        </ul>
        : null}

      {showNotes
        ? <p>Notes: {showNotes}</p>
        : null}
    </Card>
  );
};

export default Show;
