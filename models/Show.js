const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to Show db');
  })
  .catch((error) => {
    console.log('error connecting to Show db:', error.message);
  });

const showSchema = new mongoose.Schema({
  date: {
    month: Number,
    day: Number,
    year: Number
  },
  venue: {
    name: String,
    location: {
      city: String,
      state: String,
      country: String
    }
  },
  sets: {
    setOne: [],
    setTwo: [],
    encore: []
  },
  showNotes: [],
  countsForStats: Boolean,
  audioLink: String
});

showSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Show', showSchema);
