var axios = require('axios')
var fs = require('fs')
var FormData = require('form-data');
var newFile = fs.createReadStream("scans\\michael.fpt");
const form = new FormData();
const url = "http://192.168.0.101:3030/upload-FingerPrint"

form.append("file", newFile);
form.append("email", "aaa");
form.append("name", "bbb");

axios.post(url,
form
,{
    headers: {...form.getHeaders()}
  }
)
// .then((res)=>{
//   console.log({res})
// })
.catch((err)=>{
  console.log({err})
})
