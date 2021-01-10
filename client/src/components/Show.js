import React from 'react';

const Show = ({ show }) => {
  // const date = Object.values(show.date).join('/');
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

      {setOne.length > 0
        ? <p>Set One: {setOne.map((song, index) => (
          <span key={song.title}>
            <a key={song.title} href='#'>
              {song.title}
            </a>
            {index === setOne.length - 1 ? null : (song.transition ? ' > ' : ', ')}
          </span>
        ))}
          </p>
        : null}

      {setTwo.length > 0
        ? <p>Set Two: {setTwo.map(song => song.title).join(', ')}</p>
        : null}

      {setThree.length > 0
        ? <p>Set Three: {setThree.map(song => song.title).join(', ')}</p>
        : null}

      {encore.length > 0
        ? <p>Encore: {encore.map(song => song.title).join(', ')}</p>
        : null}

      {showNotes
        ? <p>Notes: {showNotes}</p>
        : null}
    </div>
  );
};

export default Show;
