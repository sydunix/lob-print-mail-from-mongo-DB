// Insert recipient addresses into database
// 'use strict';

var mongoose = require('mongoose');
const env = require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
.then(() => console.log('Mongo Connection Open'))
.catch((err) => console.log('Mongo Connection Error', err));


const userSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    street: String,
    apartment: String,
    city: String,
    state: String,
    zip_code: Number,
    country: String
  });
  
  const eod17nov = mongoose.model('eod17nov', userSchema);

  const wed17nov2021 = [
    {
        name: "Kelly Jones",
        amount: 185.54,
        street: "185 Berry St,",
        apartment: "",
        city: "San Francisco",
        state: "CA",
        zip_code: 94107,
        country: "US"
    },

    {
        name: "Margaret Smith",
        amount: 387.45,
        street: "6575 W Rialto",
        apartment: "",
        city: "fresno",
        state: "CA",
        zip_code: 93723,
        country: "US"
    },

    {
        name: "Jess Smith",
        amount: 19.87,
        street: "537 Fillmore Street",
        apartment: "Apt #2",
        city: "San Francicso",
        state: "CA",
        zip_code: 94117,
        country: "US"
    },

    {
        name: "Michael Thruman",
        amount: 347.21,
        street: "1625 Post St",
        apartment: "",
        city: "San Francicso",
        state: "CA",
        zip_code: 94115,
        country: "US"
    },

    {
        name: "Gerald Merritt",
        amount: 278.4,
        street: "333 Post St",
        apartment: "",
        city: "San Francicso",
        state: "CA",
        zip_code: 94108,
        country: "US"
    },

    {
        name: "Linda Anderson",
        amount: 425.4,
        street: "655 Fake Address",
        apartment: "Fake Apartment",
        city: "Not a City",
        state: "CA",
        zip_code: 06475-1246,
        country: "US"

    },

    {
        name: "John Travolta",
        amount: 175.84,
        street: "111 NotAnAddress",
        apartment: "",
        city: "San Francisco",
        state: "CA",
        zip_code: 94107,
        country: "US"
    }

    ];

    eod17nov.insertMany(wed17nov2021)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })
