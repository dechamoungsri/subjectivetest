var express = require('express');
var router = express.Router();

var number_of_test = 10;
var number_of_sound = 50;

var random_file = function () {

	var rad_list = random_unique(number_of_sound, number_of_test, 1);

	var file_list = gen_filenames(rad_list);
	console.log('Random List : ' + file_list);
  	return file_list;
}

var pref_choice_rad = function() {

	var methods_shuffle = [];

	for (var i = 0; i < number_of_test; i++) {
		var cho = gen_pref_choice_rad();
		// console.log(cho);
		methods_shuffle.push(shuffle(cho));
		// console.log(methods_shuffle)
	};

	return methods_shuffle;

}

var gen_pref_choice_rad = function() {

	var choices = [];
	choices.push(shuffle([0,1]));
	choices.push(shuffle([0,2]));
	choices.push(shuffle([1,2]));

	return choices

}

var mos_choice_rad = function() {

	var number_of_method = 3;
	
	var out = []

	for (var i = 0; i < number_of_test; i++) {
		var rad_list = random_unique(number_of_method, number_of_method , 0);
		out.push(rad_list);
	};
	return out;
}

var random_unique = function (range, number, add) {

	var out = [];

	while(out.length < number) { 
    	var rad = Math.floor(Math.random() * range) + add;
    	if (out.indexOf(rad) == -1) {
    		out.push(rad);
    	}
	}

	return out;
}

var gen_filenames = function (radlist) {
	var out = [];
	for (var i = 0; i < radlist.length; i++) {
		var str = 'tscsdj' + pad(radlist[i], 2) + '.wav';
		//console.log(str)
		out.push(str);
	};
	return out;
}

var pad = function (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
	var rand_files = random_file();
	var mos_choice_shuffled_list = mos_choice_rad();

	var pref_shuffled_list = pref_choice_rad();

	console.log(mos_choice_shuffled_list);

	console.log(pref_shuffled_list);

	  res.render('index', { 
	  		title: 'Express', 
	  		testdata: JSON.stringify(rand_files),
	  		mos_choices : JSON.stringify(mos_choice_shuffled_list),
	  		pref_choice : JSON.stringify(pref_shuffled_list)
		});
});

module.exports = router;
