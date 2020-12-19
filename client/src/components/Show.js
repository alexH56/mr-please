import React from 'react';

const Show = ({ info }) => {
  const setOne = info.sets.setOne;
  const setTwo = info.sets.setTwo;
  const encore = info.sets.encore;

  const date = Object.values(info.date).join('/');

  return (

    <div>
      <h3>{date} - {info.venue.name}</h3>

      {setOne
        ? <p>Set One: {setOne.map(song => song.title).join(', ')}</p>
        : null}

      {setTwo
        ? <p>Set Two: {setTwo.map(song => song.title).join(', ')}</p>
        : null}

      {encore
        ? <p>Encore: {encore.map(song => song.title).join(', ')}</p>
        : null}
    </div>

  );
};

export default Show;
