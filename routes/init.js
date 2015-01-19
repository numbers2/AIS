var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('init', {title:'A.I.S自动化工作系统-项目初始化',initData:[{'type':'meta','content':[{'name':'charset','val':['UTF-8','GB2312','GBK']},{'name':'http-equiv','val':['content-type','X-UA-Compatible','default-style','refresh']},{'name':'name','val':['keywords','description','author','viewport','generator','revised','others']}]},{'type':'css','content':['zepto.css','jquery.min.css','bootstrap.min.css']},{'type':'javascript','content':['zepto.js','jjquery.min.js','bootstrap.min.js']}]});
});


router.post('/data',function(req,res){
	console.log("typeof(req.body):"+typeof(req.body));
	console.log(JSON.stringify(req.body));
	console.log("length:"+req.body.data.length);
	console.log("shenli @@ >>");

	
});


module.exports = router;
