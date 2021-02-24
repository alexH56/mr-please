import React from 'react';
import { Link } from 'react-router-dom';

const Show = ({ show }) => {
  const { month, day, year } = show.date;
  const date = `${month}/${day}/${year}`;
  const venueName = show.venue.name;

  const setOne = show.sets[1];
  const setTwo = show.sets[2];
  const setThree = show.sets[3];
  const encore = show.sets.encore;

  const showNotes = show.showNotes;

  return (
    <div>
      <h3>{date} - {venueName}</h3>

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

      {showNotes
        ? <p>Notes: {showNotes}</p>
        : null}
    </div>
  );
};

export default Show;
