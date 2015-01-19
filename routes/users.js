var express = require('express');
var router = express.Router();
var db = require('../db/db');
var ObjectID = require('mongodb').ObjectID;
var User = require('../lib/user');
var crypto = require('crypto');


/* GET users listing. */
router.get('/', function(req, res) {
	res.render('users', {title:'A.I.S自动化工作系统'});
});

router.get('/list',function(req,res){
	db.open(function(err,db){
		db.collection('users',function(err,collection){
			collection.find().toArray(function(err,users){
				db.close();
				res.json({
					code: 0,
					data: users
				});
			});
		});
	});
});


router.post('/save',function(req,res){
	var user = {'name':req.body['name'],'email':req.body['email'],'password':crypto.createHash('md5').update(req.body['password']).digest('base64'),'regDate':req.body['regDate']};
	var _id = req.body['_id'];
	if(_id != undefined && _id != ''){
		user.id = _id
	}
	users = new User(user);

	users.save(function(err,result){
		if(err){
			res.json({
				code: 1,
				msg: err
			});
		}else{
			req.session.user = users;
			res.message('注册成功','success')
			res.json({
					code : 0
				});
		}
	});
})	


router.post('/del',function(req,res){
	var user={},_id = req.body['id'];
	if(_id != undefined && _id != ''){
		user.id = _id
	}
	users = new User(user);
	users.delete(function(err,remcount){
		if(err){
				res.json({
					code:1,
					msg:err
				});
			}
			else{
				res.json({
					code:0,
					data:remcount
				});
			}
	})
});
module.exports = router;
