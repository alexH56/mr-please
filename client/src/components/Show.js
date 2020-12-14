import React from 'react';

const Show = ({ info }) => {
  const setOne = info.sets.setOne;
  const setTwo = info.sets.setTwo;
  const encore = info.sets.encore;

  return (

    <div>
      {/* {setOne
        ? <p>Set One: {setOne.map(song => (
          <span key={song.id}>{song.name}</span>
        ))}
        </p>
        : null} */}
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
