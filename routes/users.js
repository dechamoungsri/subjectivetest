var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var write_fs = function(folder, filename, data) {
	// Route + folder + filename
	var file = path.join(__dirname, folder, filename);
	fs.writeFile(file, data, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('จบแล้วจ้า ขอบคุณมาก');
});

router.post('/', function(req, res, next) {
  console.log('respond with a resource ' + req.body.name);
  console.log('respond with a resource ' + req.body.mosscore);
  console.log('respond with a resource ' + req.body.prefscore);

  var name = '' + req.body.name
  var timestamp = new Date().getTime()

	write_fs('result', name + '-' + timestamp + '-mos-score.txt', req.body.mosscore)
	write_fs('result', name + '-' + timestamp + '-pref-score.txt', req.body.prefscore)

  res.contentType('application/json');
	var data = JSON.stringify('/users')
	res.header('Content-Length', data.length);
	res.end(data);
});

module.exports = router;
