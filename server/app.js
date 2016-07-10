"use strict"

let express = require("express")
let app = express();
let mongoUtil = require('./mongoUtil');
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );


app.get("/sports", (request, response) => {
  let sports = mongoUtil.sport();
  sports.find().toArray((err, docs) => {
    if(err){
      response.sendStatus(400);
    }
    let sportNames = docs.map((sport) => sport.name);
    console.log(sportNames);
    response.json(sportNames);
  })

});


app.get("/sports/:name", (request, response) => {
  let sportName = request.params.name;
  let sports = mongoUtil.sport();
  sports.find({name: sportName}).limit(1).next((err,doc) =>{
    if(err){
      response.sendStatus(400);
    }
    console.log("Sport Doc: ", doc);
    response.json(doc);
  });
});


app.post("sports/:name/medals", (request, response) => {
    let sportName = request.params.name;
    let medal = request.body.medal;

    let sports = mongoUtil.sport();
    let query = {name: sportName};
    let update = {$push: {goldMedals: newMedal}}

    sports.findOneAndUpdate(query, update, (err, res) => {
      if(err){
        response.sendStatus(400);
      }
      response.sendStatus(201);
    });

    // console.log("sport name:", sportName);
    // console.log("medal", medal);

    response.sendStatus(201);
});

app.listen(8181, () => console.log("listeing on 8181"));
