import React, { useState, useEffect } from 'react';

const Show = ({ songs }) => {
//   useEffect(() => {
//     console.log(songs.sets.setOne);
//   }, [songs]);

  return (

    <div>
      <p>Set One: {songs.sets.setOne.map(song => song.title).join(', ')}</p>
      <p>Set Two: {songs.sets.setTwo.map(song => song.title).join(', ')}</p>
      <p>Encore: {songs.sets.encore.map(song => song.title).join(', ')}</p>
    </div>

  );
};

export default Show;
