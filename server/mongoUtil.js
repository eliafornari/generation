"use strict";

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
  connect() {
    client.connect('mongodb://0.0.0.0:27017/olympics-dev', (err, db) => {
      if(err){
        console.log(err);
        console.log("error connecting to mongo");
        process.exit(1);
      }
      // console.log(err);

      _db = db;
      console.log("connected to mongo");
    });
  },
  sport(){
    return _db.collection('sports');
  }
}
