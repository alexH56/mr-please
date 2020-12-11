import React, { useEffect, useState } from 'react';

import Show from './components/Show';

import retrievalService from './services/retrieval';

const App = () => {
  const [show, setShow] = useState('');

  useEffect(() => {
    retrievalService
      .getShow()
      .then(returnedShow => {
        setShow(returnedShow);
      });
  },
  []);
  return (
    <div className='App'>
      {show
        ? <Show
          songs={show}
          />
        : null}

    </div>
  );
};

export default App;
