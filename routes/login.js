var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log("login ...");
    res.render('login', { title: 'A.I.S自动化工作系统平台' });
});

module.exports = router;
