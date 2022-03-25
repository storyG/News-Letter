const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  var jsonData = JSON.stringify(data);
  // Add url!!
  const url = ''
  // Add auth!!
  const options = {
    method: "POST",
    auth: ""
  }
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});

// API Key
// a020388a2c68328a86f0d8f53e789198-us14


// Audience ID
//cf53f1c2a1
