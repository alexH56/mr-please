const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const sampleShow = {
  date: new Date(),
  venue: 'Logan Street Studio',
  sets: {
    setOne: [
      {
        id: 1,
        title: 'Johnny'
      },
      {
        id: 2,
        title: 'O'
      },
      {
        id: 3,
        title: 'Go Funk Yourself'
      }
    ],
    setTwo: [
      {
        id: 4,
        title: 'Peace Lily'
      },
      {
        id: 5,
        title: 'Head 2 Head'
      },
      {
        id: 6,
        title: 'Tyler\'s Song'
      }
    ],
    encore: [
      {
        id: 7,
        title: 'Diggin a Hole'
      },
      {
        id: 8,
        title: 'Johnny (reprise)'
      }
    ]
  }
}
;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/show', (request, response) => {
  response.json(sampleShow);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
