/**
 * Test the zip method with node-native-zip
 */
var express = require('express');
var router = express.Router();
//https://github.com/janjongboom/node-native-zip
var fs = require("fs");
var zip = require("node-native-zip");

/**
 *  GET users listing. 
 **/
router.get('/', function(req, res) {
	console.log("zip/");
	var archive = new zip();

	archive.add("hello.txt", new Buffer("Hello world", "utf8"));
	archive.add("hello2.txt",new Buffer("Word Hello 2","utf8"));

	var buffer = archive.toBuffer();
	fs.writeFile("./test1.zip", buffer, function () {
	    console.log("Finished");
	});
	res.json({'success':true});
});

module.exports = router;