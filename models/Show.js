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
    URLname: String,
    location: {
      street: String,
      street2: String,
      city: String,
      state: String,
      zip: String,
      country: String
    }
  },
  sets: {
    1: [],
    2: [],
    3: [],
    encore: []
  },
  showNotes: String,
  countsForStats: Boolean,
  audioLink: String
});

showSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

module.exports = mongoose.model('Show', showSchema);
