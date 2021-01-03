const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to Song db');
  })
  .catch((error) => {
    console.log('error connecting to Song db:', error.message);
  });

const songSchema = new mongoose.Schema({
  title: String,
  URLname: String,
  artist: String
});

songSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

module.exports = mongoose.model('Song', songSchema);
