import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShowHeading from './ShowHeading';

const Show = ({ show }) => {
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

  // end styles

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
        // venueName={venue.name}
        // venueURL={venue.URLname}
        // city={venue.location.city}
        // state={venue.location.state}
      />

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

      {songNotes.length > 0
        ? <ul>
          {songNotes.map(note => (
            <li key={note.id}>
              {`[${note.id}] ${note.text}`}
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
