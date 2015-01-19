/**
  * Use Uglify js to concat the js files.
  * that just a example.
  */
var express = require('express');
var router = express.Router();
//https://github.com/mishoo/UglifyJS/
var fs = require('fs');
var ug = require('uglify-js');
var jsp = ug.parser;
var pro = ug.uglify;
 
/**
 * Concat the JS file(s)
 * @param flieIn: file name or a array of file names.
 * @param fileOut: target file name.
 */
function jsMinifier(flieIn, fileOut) {
     var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];
     var origCode,ast,finalCode='';
     for(var i=0; i<flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        ast = jsp.parse(origCode);
        ast = pro.ast_mangle(ast);
        ast= pro.ast_squeeze(ast); 
        finalCode +=';'+ pro.gen_code(ast);
     }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}
 

/**
 *  GET users listing. 
 **/
router.get('/', function(req, res) {
	console.log(" GET ug/");

	// jsMinifier('./file-src/test2.js', './file-smin/test-min.js');  //单个文件压缩
	jsMinifier(['../../src/common/array/ais.array.js','../../src/common/array/ais.list.js'], './array.js'); //合并压缩

	res.json({'success':true});
});

module.exports = router;
