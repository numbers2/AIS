var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var crypto = require('crypto');

/* GET home page. */

router.route('/')
.get(function(req, res, next) {
	if(req.session.user){
		res.render('index', {title:'A.I.S自动化工作系统'});
	}else{
		res.render('login');
	}
})
.post(function(req, res, next) {
	var user = {'email':req.body['email'],'password':req.body['password']};
	var password = crypto.createHash('md5').update(user.password).digest('base64');

	User.get({'email':req.body['email']},function(err,result){
		if(err){
			res.json({
					code: 1,
					msg: err
				});
		}else{
			if(!result){
				res.error('邮箱地址不存在')
				res.render('login');

			}else if(result.password != password ){


				res.error('密码错误')
				res.render('login');
				
				
			}else{
				req.session.user = result;
				res.message('登入成功','success')
				res.render('index', {title:'A.I.S自动化工作系统'});
			}
		}
	})
})

router.route('/logout')
.get(function(req,res){
	req.session.user = null;
	res.message('登出成功','success')
	res.locals.removeMessages()
	res.redirect('/');
})



module.exports = router;
