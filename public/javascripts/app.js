var app = app || {};

var count = 0

var sound_path = '/speechwav/';
var methods = ['01_Conventional/','02_Single_space_K4/','02_Separated_space_K2/'];

var mos_sent_back = {}//new Array();
var pref_sent_back = {}//new Array();

$(document).on('ready', function(){

	console.log('ready');
	// var str = JSON.stringify(obj); 
	// console.log('ready ' + mos);

	initial()
	// sendData() 

	console.log(mos_sent_back)
	console.log(pref_sent_back)

	loadData()

	$('#next-button').on('click',function(){

		//Make an AJAX request
		count++;
		console.log(count);
		document.getElementById('mossection').style.display = 'block'
		document.getElementById('prefsection').style.display = 'block'
		$( "#endpage" ).empty();
		if (count >= testdata.length) {
			count = testdata.length
			show_end_page()
		}
		else {
			$('#soundindex').html( 'Mos Test ' + (count+1)+'.');
			$('#soundindexpref').html( 'Preference Test ' + (count+1)+'.');
			console.log(mos_sent_back)
			loadData()
		}
		

	});

	$("input:radio[name=mosscore0]").click(function() {
		var mos_index = 0
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_mos_score(mos_index, value)
	});

	$("input:radio[name=mosscore1]").click(function() {
		var mos_index = 1
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_mos_score(mos_index, value)
	});

	$("input:radio[name=mosscore2]").click(function() {
		var mos_index = 2
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_mos_score(mos_index, value)
	});

	$("input:radio[name=prefscore0]").click(function() {
		var pref_index = 0
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_pref_scroe(pref_index, value)
	});

	$("input:radio[name=prefscore1]").click(function() {
		var pref_index = 1
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_pref_scroe(pref_index, value)
	});

	$("input:radio[name=prefscore2]").click(function() {
		var pref_index = 2
    	var value = $(this).val();
    	// console.log('Score : ' + value)
    	get_pref_scroe(pref_index, value)
	});

});

function show_end_page() {

	var isEnd = true

	var not_finish_mos = []
	var not_finish_pref = []

	for (var i = 0; i < testdata.length; i++) {
		var file = testdata[i]

		// console.log(mos_sent_back[file]);

		for (var j = 0; j < mos_choices[i].length; j++) {
			var val = mos_sent_back[file][ methods[mos_choices[i][j]] ] ;
			// console.log(val);
			if (val == 0) {
				isEnd = false
				not_finish_mos.push(i)
				break;
			}
		};

		console.log(pref_sent_back[file]);

		for (var j = 0; j < pref_choice[i].length; j++) {

			var met = methods[ pref_choice[i][j][0] ] + '---' + methods[ pref_choice[i][j][1] ]

			var val = pref_sent_back[file][ met ] ;

			if (val == 0) {
				isEnd = false
				not_finish_pref.push(i)
				break;
			}
			console.log(val);

		};

	};

	if(!isEnd) {

		document.getElementById('mossection').style.display = 'none'
		document.getElementById('prefsection').style.display = 'none'

		for (var i = 0; i < not_finish_mos.length; i++) {
			$('#endpage').append('<p> Please, do ข้อ mos : '+ (not_finish_mos[i]+1) +'</p>');
		};

		for (var i = 0; i < not_finish_pref.length; i++) {
			$('#endpage').append('<p> Please, do ข้อ Preference : '+ (not_finish_pref[i]+1) +'</p>');
		};

	}
	else {
		//sendData here
		sendData()
	}
	

}

$(document).on('ready', function(){

	$('#prev-button').on('click',function(){
		//Make an AJAX request
		document.getElementById('mossection').style.display = 'block'
		document.getElementById('prefsection').style.display = 'block'
		$( "#endpage" ).empty();
		count--;
		if(count<0) count = 0;
		console.log(count);
		$('#soundindex').html( 'Mos Test ' + (count+1)+'.');
		$('#soundindexpref').html( 'Preference Test ' + (count+1)+'.');
		console.log(mos_sent_back)
		loadData()

	});

});

function get_pref_scroe(index, value) {

	var met = $('#prefhidden'+index).val();

	// console.log(pref_sent_back[testdata[count]])
	pref_sent_back[testdata[count]][met] = value

	console.log(pref_sent_back)
}

function get_mos_score(index, value) {

	var met = $('#moshidden'+index).val();

	mos_sent_back[testdata[count]][met] = value

	// console.log(mos_sent_back[testdata[count]])
}

function initial() {

	for (var i = 0; i < mos_choices.length; i++) {

		var mos_ch = mos_choices[i];
		
		var score = {}//new Array()
		for (var j = 0; j < mos_ch.length; j++) {
			
			score[ methods[mos_ch[j]] ] = 0
		};

		mos_sent_back[testdata[i]] = score

	};

	for (var i = 0; i < pref_choice.length; i++){

		var pref_ch = pref_choice[i];
		var score = {} //new Array()
		for (var j = 0; j < pref_ch.length; j++) {
			
			score[ methods[pref_ch[j][0]] + '---' + methods[pref_ch[j][1]] ] = 0
		};

		pref_sent_back[testdata[i]] = score
	}

}

function loadData() {

	// mos section

	var mos_ch = mos_choices[count];
	// console.log(mos_ch)

	var file = testdata[count]

	for (var i = 0; i < mos_ch.length; i++) {
		var file_path = sound_path + methods[mos_ch[i]] + file
		// console.log(file_path)

		var audio = document.getElementById('audiosection'+i);
		audio.src=file_path;
		audio.load();
		// console.log(audio);
		$("#moshidden"+i).val(methods[mos_ch[i]]);

		var met = methods[mos_ch[i]]
		// console.log(testdata[count])
		// console.log(met)
		// console.log(mos_sent_back[testdata[count]][met])
		if (mos_sent_back[testdata[count]][met] == 0) {
			$("input:radio[name=mosscore"+i+"]").prop('checked', false);
		}
		else {
			$('input[name="mosscore' + i + '"][value="' + mos_sent_back[testdata[count]][met] + '"]').prop('checked', true);
		}
		
	};

	// pref section

	var pref_ch = pref_choice[count]

	for (var i = 0; i < pref_ch.length; i++) {
		var choices = pref_ch[i]
		// console.log(choices)

		$("#prefhidden"+i).val(methods[choices[0]] + '---' + methods[choices[1]] );

		for (var j = 0; j < choices.length; j++) {

			var file_path = sound_path + methods[choices[j]] + file
			// console.log(file_path)
			$('#prefrad' + i + j ).val(methods[choices[j]]);

			var audio = document.getElementById('audiosectionpref'+i+j);
			audio.src=file_path;
			audio.load();
			// console.log(audio);

		};

		var met = methods[choices[0]] + '---' + methods[choices[1]]

		if (pref_sent_back[testdata[count]][met] == 0) {
			$("input:radio[name=prefscore"+i+"]").prop('checked', false);
		}
		else {
			$('input[name="prefscore' + i + '"][value="' + pref_sent_back[testdata[count]][met] + '"]').prop('checked', true);
		}

	};

}

function sendData() {
	// console.log(mos_sent_back)
	var json_data = JSON.stringify(mos_sent_back);
	// console.log(json_data)
    $.ajax({
        url: '/users',
        type: 'POST',
        data: {
        	name:$('#nickname').val(),
        	mosscore: JSON.stringify(mos_sent_back),
        	prefscore: JSON.stringify(pref_sent_back)
        },
        dataType: 'json'
    }).success(function(data) {
       window.location = '/users';
    });;
}