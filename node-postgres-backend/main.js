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
    //1-lWmmll8gWzlF5V_3dVOehX9e_uSaYfdGqJ0w2B9C3g
    //1jlI5IdReXO_56nrT1e4b868hMOa6wzTP1qst1zsUBZc
    const opt = {
        spreadsheetId : '1-lWmmll8gWzlF5V_3dVOehX9e_uSaYfdGqJ0w2B9C3g',
        range: 'Data!A1:Y100'
    };
//https://docs.google.com/spreadsheets/d/1-lWmmll8gWzlF5V_3dVOehX9e_uSaYfdGqJ0w2B9C3g/edit#gid=0
//https://console.cloud.google.com/apis/credentials?showWizardSurvey=true&project=react-graph-309616
   let data = await gsapi.spreadsheets.values.get(opt);
   let dataArray = data.data.values;
   let newDataArray = dataArray.map(function(r)
   {
    //  r.push(r[0] + '-' + r[1]); 
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

