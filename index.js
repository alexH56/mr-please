require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// mongoose model imports
const Song = require('./models/Song');
const Show = require('./models/Show');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/shows', (request, response) => {
  Show
    .find({})
    .then(shows => {
      console.log(shows);
      response.json(shows);
    });
});

app.get('/api/songs', (request, response) => {
  Song
    .find({})
    .then(songs => {
      response.json(songs);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
