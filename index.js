
// 'use strict';

// connecting lob API
const Lob = require('lob')('test_API');

// connecting contentful cms
const contentful = require('contentful');
const clientele = contentful.createClient({
  space: 'SPACE_ID',
  accessToken: 'TOKEN_ID'
});

const converter = require('json-2-csv');
const fs        = require('fs');
const moment    = require('moment');
const parse     = require('csv-parse');
const mongoose = require('mongoose');

const successFd = fs.openSync(`${__dirname}/success.csv`, 'w');
const errorFd = fs.openSync(`${__dirname}/error.csv`, 'w');
const letterTemplate = fs.readFileSync(`${__dirname}/letter_template.html`).toString();

const companyInfo = {
  name: 'Deluxe Virgina Realty',
  address_line1: '185 Berry St.',
  address_line2: 'Ste 170',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: 94107,
  address_country: 'US'
};


mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true})
.then(() => console.log('Mongo Connection Open'))
.catch((err) => console.log('Mongo Connection Error', err));


const userSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    address_line1: String,
    address_line2: String,
    address_state: String,
    address_zip: Number,
    address_country: String
  });

  const collection = mongoose.model('collection', userSchema);
  
  
  collection.find({}, (err, data) => {
    if (err) {
        return console.log(err);
    } 

    data.map((customer) => {
       
  const client = customer.toObject();
  const name =  client.name;
  const amount =  parseFloat(client.amount).toFixed(2);
  const address = {
      recipient: name,
      primary_line:  client.street,
      secondary_line:  client.apartment,
      city:  client.city,
      state:  client.state,
      zip_code:  client.zip_code
   }



    Lob.letters.create({
    description: `Automated Past Due Bill for ${name}`,
    to: {
      name: address.recipient,
      address_line1: address.primary_line,
      address_line2: address.secondary_line,
      address_city: address.city,
      address_state: address.state,
      address_zip: address.zip_code,
      address_country: 'US'
    },
    from: companyInfo,
    file: letterTemplate,
    merge_variables: {
      date: moment().format('LL'),
      name,
      amountDue: amount
    },
    color: true
    }).then((letter) => {
      console.log(`Successfully sent a letter to ${client.name}`);
      client.letter_id = letter.id;
      client.letter_url = letter.url;
      converter.json2csv(client, function (err, csv){
        if (err) {
          throw err;
        }
        fs.write(successFd, csv, function(error, result) {
          if(error) console.log('error', error); 
        });
      });
    }).catch(() => {
      console.log(`Could not send letter to ${client.name}`);
      converter.json2csv(client, function (err, csv) {
        if (err) {
          throw err;
        }
        fs.write(errorFd, csv, function(error, result) {
          if(error) console.log('error', error);
        });
      });
    });
  });    
});
  