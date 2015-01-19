// var Db = require('mongodb').Db,
// 	MongoClient = require('mongodb').MongoClient,
// 	Server = require('mongodb').Server,
// 	assert = require('assert'),
// 	settings = require('../settings');

// // var db = new Db('ais',new Server('10.59.94.80',27017),{safe:true});
// var db = new Db(settings.db,new Server(settings.host,settings.port,{}),{safe:true});



var settings = require('./settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;


var db= new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}),{safe:true});


module.exports = db;

