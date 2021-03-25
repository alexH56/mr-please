import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Show = ({ show }) => {
  const Card = styled.div`
    background: papayawhip;
    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
    border-radius: 20px;
    padding: 10px;
    width: 90%;
    margin-bottom: 40px;

    @media (min-width: 400px) {
      max-width: 60%;
    }

    a {
      color: palevioletred;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    
    span {
      color: palevioletred;
    }
  `;

  const Heading = styled.h3`
    margin-top: 0;
  `;

  // end styles

  const { month, day, year } = show.date;
  const date = `${month}/${day}/${year}`;
  const venueName = show.venue.name;

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
      <Heading>{date} - {venueName}</Heading>

      {/* {setID === 'encore' ? 'Encore: ' : `Set ${setID}: `}
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
        ))} */}

      {setOne.length > 0
        ? <p>Set One: {setOne.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setOne.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p>
        : null}

      {setTwo.length > 0
        ? <p>Set Two: {setTwo.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setTwo.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p>
        : null}

      {setThree.length > 0
        ? <p>Set Three: {setOne.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === setOne.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p>
        : null}

      {encore.length > 0
        ? <p>Encore: {encore.map((song, index) => (
          <span key={song.title}>
            <Link to={`/setlists/songs/${song.URLname}`} key={song.title}>
              {song.title}
            </Link>
            {song.note ? <sup>[{song.note.id}]</sup> : null}
            {index === encore.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
        </p>
        : null}

      <ul>
        {songNotes.map(note => (
          <li key={note.id}>
            {`[${note.id}] ${note.text}`}
          </li>
        ))}
      </ul>

      {showNotes
        ? <p>Notes: {showNotes}</p>
        : null}
    </Card>
  );
};

export default Show;
