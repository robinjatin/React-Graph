const axios = require('axios');
const {google} = require('googleapis');
const keys = require('./keys.json');
var array = []
const client = new google.auth.JWT(
keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
client.authorize(function(err, tokens){

    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Connected!!');
        gsrun(client);
    }
 });

 async function gsrun(cl){

    const gsapi = google.sheets({version:'v4', auth: cl});
    const opt = {
        spreadsheetId : process.env.SPREADSHEET_ID,
        range: 'Data!A1:Y100'
    };
   let data = await gsapi.spreadsheets.values.get(opt);
   let dataArray = data.data.values;
   let newDataArray = dataArray.map(function(r)
   {
     return r;
   });
   array = newDataArray
   console.log(newDataArray)
 }
 const getdata = (request, response) => {

    if(array.length > 0){
      response.send(array)
    }
    else{
      response.send("empty")
    }
}
module.exports = {getdata}

