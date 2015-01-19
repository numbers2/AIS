
var db = require('../db/db');
var ObjectID = require('mongodb').ObjectID;



module.exports = User;

function User (obj) {
	for(var key in obj){
		this[key] = obj[key];
	};
}

User.prototype.save = function(fn){
	var user = this;
	db.open(function(err,db){
		if(err){
			return fn(err)
		}
		db.collection('users',function(err,collection){
			if(err){
				return fn(err)
			}
			var callback = function(err,result){
				db.close();
				fn(err,result)
			};
			if(user.id){
				collection.update({'_id': new ObjectID(user.id)},{$set:user},{safe:true},callback);
			}else{
				collection.insert(user,{safe:true},callback);
			};
		})
	})
}

User.prototype.delete = function(fn){
	var user = this;
	db.open(function(err,db){
		if(err){
			return fn(err)
		}
		db.collection('users',function(err,collection){
			if(err){
				return fn(err)
			}
			collection.remove({'_id':new ObjectID(user.id)},function(err,remcount){
				db.close();
				fn(err,remcount)
			})

		})
	})
}


User.get = function(obj,fn) {
	db.open(function(err,db){
		db.collection('users',function(err,collection){
			collection.findOne(obj,function(err,result){
				db.close()
				if(result){
					fn(err,new User(result))
				}else{
					fn(err,null)
				}
			})
		})
	})
}




