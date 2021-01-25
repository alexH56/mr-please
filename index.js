require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// mongoose model imports
const Song = require('./models/Song');
const Show = require('./models/Show');
const Venue = require('./models/Venue');

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/shows', (request, response) => {
  Show
    .find({})
    .then(shows => {
      console.log(shows);
      response.json(shows);
    })
    .catch(err => console.log('Error finding shows:', err));
});

app.get('/api/songs', (request, response) => {
  Song
    .find({})
    .then(songs => {
      response.json(songs);
    })
    .catch(err => console.log('Error finding songs:', err));
});

app.get('/api/venues', (request, response) => {
  Venue
    .find({})
    .then(venues => {
      response.json(venues);
    })
    .catch(err => console.log('Error finding venues:', err));
});

app.post('/api/shows', (request, response) => {
  const show = new Show({ ...request.body });

  show.save()
    .then(result => {
      console.log('show saved!');
      console.log(result);
      response.json(show);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
