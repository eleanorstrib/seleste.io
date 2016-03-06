$(document).ready(function(){
	// change the size of the image based on the value selected in the box
	$('input#culturevalues').change(function(){
		$('img#culturevalues').animate({
    	left: "+=50",
    	width: parseInt($('input#culturevalues').val()) + 20,
  		}, 2000, function() {
  	});
	});

	$('input#opportunities').change(function(){
		$('img#opportunities').animate({
    	left: "+=50",
    	width: parseInt($('input#opportunities').val()) + 20,
  		}, 2000, function() {
  	});
	});

	$('input#management').change(function(){
		$('img#management').animate({
    	left: "+=50",
    	width: parseInt($('input#management').val()) + 20,
  		}, 2000, function() {
  	});
	});

	$('input#compensationbenefits').change(function(){
		$('img#compensationbenefits').animate({
    	left: "+=50",
    	width: parseInt($('input#compensationbenefits').val()) + 20,
  		}, 2000, function() {
  	});
	});

	$('input#worklifebalance').change(function(){
		$('img#worklifebalance').animate({
    	left: "+=50",
    	width: parseInt($('input#worklifebalance').val()) + 20,
  		}, 2000, function() {
  	});
	});

	$('input#recommendtoafriend').change(function(){
		$('img#recommendtoafriend').animate({
    	left: "+=50",
    	width: parseInt($('input#recommendtoafriend').val()) + 20,
  		}, 2000, function() {
  	});
	});


});