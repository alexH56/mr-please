const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to Venue db');
  })
  .catch((error) => {
    console.log('error connecting to Venue db:', error.message);
  });

const venueSchema = new mongoose.Schema({
  name: String,
  location: {
    street: String,
    street2: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }
});

venueSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

module.exports = mongoose.model('venue', venueSchema);
