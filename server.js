var http = require('http');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var server = http.Server(app);
var mongo = require('mongodb');
//for local
//var db, url = "mongodb://localhost:27071";
//for c9
var db, url = 'mongodb://' + process.env.IP + ":27017/test";
mongo.MongoClient.connect(url,
            {useNewUrlParser:true},
            function(err,client){
              if(err){
                console.log(err);
                console.log("Could not connect to mongoDB");
              }else{
                db= client.db('node=cwD');
              }
            });
            
var save = function(from_data){
  db.createCollection('users',function(err, collection){});
  var collection= db.collection('users');
  collection.save(from_data);
};            



app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.get('/about',function(req,res){
  res.sendFile(__dirname+'/about.html');
});
app.get('/email',function(req,res){
  res.sendFile(__dirname+'/email.html');
});
app.post('/submit_user',function(req,res)
{
    console.log(req.body);
    save(req.body);
    res.status(200);
});
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
