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


// {
//   "type": "service_account",
//   "project_id": "my-project-1781-react-js",
//   "private_key_id": "bdbd09e8d466e22506aefa9dc42859e70883c37a",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDD5xsY7u1UV5CI\n600zTF9o+e1Lg8rLeStplIwnCyphhcUHX+HXJOjbZPXlhgLC1UxmNxXcBxtpf0jY\new0Go0rP+tGUMktv9Y1rb2iXcPTttJoZQqRSVuX53c9zbUKxWMDg7dPYEpz8MkQs\nqRZ3sXKcuFEnEZDtx01iGHwrfdYwj5XWYp4unelOV6Tn8LwAg4CzPQ9fCV5if3e9\ndvOe1H3FSRy9EQk2lfJC0aAvfGt1iYeVr1YhldaqPLOr4+PkJmq/APojD+3HK9cK\nqQQ77n2s0t6uFIb57HL/v1DT9iZ3Ulai4MJ4k7ZHwTBqyt9sELQwttZfejptkdC3\nTm/mCOwTAgMBAAECggEAPfmV4/xqTn1pNzehc7IcmPxAKtylwlsx9bPN5ugsXy/P\nljaqHsMJe6bj99m+c97AzbFtk+8Xp/dhl0LOayQrncJOnSCQJvo65BsZrpdIlQ7G\nlWk0zOu606JtZ6nQKITYeBAlLb0ttsc8NBjGB9W2WYgh/EcdX2vmujrexW+I3FFy\ni9bE+L5pWcHwOyQsFM5VKT5YWrThfRwYHA/kawj7zgHnJhJ2+GATTiKK27XXaBDk\nsVE2iFYfc5RUSuHqZI8i0Z0eVuPHS34nqj+Uy5oTZ+IoaBVfLq4m7xsYIk7kDljB\nFOa8UE5X3sA1JD2v/bUnVBKH3zyunKkKq27IBtIz8QKBgQDrH3ihjmQPAOwy5ZF9\nj6VL90baLCrbollgSpmJReTBUqOEkNsk/bS/dj6g7MzLrQbi5PbJjvLZzhhHSHjr\n3r44dfEA0n6MwX7b8XY+qRO24/euca/mv9u7juikppMzemMZV1TdEZzeC5ixke+s\nsdeIioQ9LjRi4Of4f8ETpxBQawKBgQDVTCEVY3jDDNBvdvbUvAjEowalsiGw3lTG\nT8LTTUA0325/g960nMH87K3zo26gKsrd20JS8L2vgbl4oml71jiH0cMP5evfDKV/\nECtWiwDRpp9AD/g5ZX/is/7/Fea91En87pjVZj1u1fthEmKcJSzfOltL3PhG7oV6\nLD+qFt0c+QKBgQCUiQsyNLwtZk3RUYn6IpcwSITwK1rf6c5AsKASQp9jKgu3IbPv\nyH85PUAPdcljGmnxSOhHKRFuW26nCbeqesr87DVWaaQc09iKph4nM7UKozXDdHrF\ncYslEAEUk08HBFg6mBs6lXfeJsFN3H3nQWqCDc/AvsHFfYPOTxbwjWgXBQKBgEVB\nPbCzJn+2RmsaplQ2ZWZrRHpCVzwVRFNLjIeNGp7QORGAIKxmBXp44pYr53xryIi2\na1eAwSYeKbloinVh/eLjkcE0txwqAAY8msWzxmVMA4MKbF8+fIKATPhIBS53ojpU\nwhzv4Fx/b+p5zLjEPUiRqxj7u0VUptQfT+CLIeoJAoGBAKZzjc1zTNEvOAlumv5f\n0CSSkuUm3/W6R3lOofcb/aXMX3Sou79P/T/PyqcwtjnKWAV+eZ7ZkNMUmIErzS39\n05Uy29sSpCiV1AJw593AM+mq3I1A3fZKe5MjHLFnMgzmPzvYHu5/rSHheip2vj6K\nYi5SYXqCSPN2ZcninfQFuLt6\n-----END PRIVATE KEY-----\n",
//   "client_email": "react-938@my-project-1781-react-js.iam.gserviceaccount.com",
//   "client_id": "112225918174433332318",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/react-938%40my-project-1781-react-js.iam.gserviceaccount.com"
// }