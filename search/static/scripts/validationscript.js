$(document).ready(function(){
	// change the size of the image based on the value selected in the box
	$('input#culturevalues').change(function(){
		$('img#culturevalues').css("width", parseInt($('input#culturevalues').val()));
	});

	$('input#opportunities').change(function(){
		$('img#opportunities').css("width", parseInt($('input#opportunities').val()));
	});

	$('input#management').change(function(){
		$('img#management').css("width", parseInt($('input#management').val()));
	});

	$('input#compensationbenefits').change(function(){
		$('img#compensationbenefits').css("width", parseInt($('input#compensationbenefits').val()));
	});

	$('input#worklifebalance').change(function(){
		$('img#worklifebalance').css("width", parseInt($('input#worklifebalance').val()));
	});
	$('input#recommendtoafriend').change(function(){
		$('img#recommendtoafriend').css("width", parseInt($('input#recommendtoafriend').val()));
	});


});