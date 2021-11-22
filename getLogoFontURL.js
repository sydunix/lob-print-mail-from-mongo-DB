
//Retrieve URL of Image (CompanyLogo) stored on contentful and insert in Letter Template
'use strict';

const env = require('dotenv').config();

const contentful = require('contentful');
const clientele = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.TOKEN_ID
});
//Getting Contentful CMS uploaded FONT URL using Entry ID (to be inserted in src tag of HTML Template)
clientele.getAsset(process.env.ENTRY_ID_FONT)
.then(asset => console.log('https:'+ asset.fields.file.url))
.catch(err => console.log(err));

//Getting Contentful CMS uploaded Logo URL using Entry ID (to be inserted in src tag of HTML Template)
clientele.getAsset(process.env.ENTRY_ID_IMAGE)
.then(asset => console.log('https:'+ asset.fields.file.url))
.catch(err => console.log(err));

clientele.getEntry(process.env.ENTRY_ID_ADDRESS)
.then((entry) => {
  const client = entry.fields;
  const name =  client.name;
  const address = {
      recipient: name,
      primary_line:  client.addressLine1,
      secondary_line:  client.addressLine2,
      city:  client.addressCity,
      state:  client.addressState,
      zip_code:  client.addressZip
  }

  let objcode = {name, address};
  console.log(objcode);
})
.catch(err => console.log(err));

