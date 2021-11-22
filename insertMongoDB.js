// Insert recipient addresses into database
// 'use strict';

var mongoose = require('mongoose');
const env = require('dotenv').config();
import { sampleData } from './entryList';

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
  
  const manifest = mongoose.model(process.env.COLLECTION, userSchema);

    manifest.insertMany(sampleData)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })
