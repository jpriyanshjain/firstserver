const express = require("express");
const  bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/' , function(req, res){
        res.sendFile(__dirname+"/signup.html");
})

app.post('/' , function(req, res){

    let firstName = req.body.firstName;
    let LastName = req.body.lastName
    let email = req.body.email;
    var data = {
        menbers : [
            {
                email_address: email,
                status: "subscribed",
                merge_field:{
                    FNAME: firstName,
                    LNAME: LastName
                }
            }
        ]
    }
    const jsondata = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/list/5f0d11301a"
    const options = {
        method: "POST",
        auth: "priyansh:57d2262e4c409cd9796930289bbd1b33-us6"
    }
  const request =   https.request(url,options, function(response) {
      if(response.statusCode === 200) {
          res.send("you got it")
      }
      else{
          res.send("error " + response.statusCode)
      }
      response.on('data', function(data) {
        console.log(JSON.parse(data));

      })
    }) ;
    request.write(jsondata);
    request.end();
})






app.listen(process.env.PORT || 3000,function(){
    console.log("server stated");
})



//unique id
// 5f0d11301a

//api 57d2262e4c409cd9796930289bbd1b33-us6