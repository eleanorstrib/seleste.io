$(document).ready(function(){
	var priorities = {}
	// change the size of the image based on the value selected in the box
	$('input#culturevalues').change(function(){
		$('img#culturevalues').animate({
    	left: "+=80",
    	width: parseInt(($('input#culturevalues').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#opportunities').change(function(){
		$('img#opportunities').animate({
    	left: "+=80",
    	width: parseInt(($('input#opportunities').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#management').change(function(){
		$('img#management').animate({
    	left: "+=80",
    	width: parseInt(($('input#management').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#compensationbenefits').change(function(){
		$('img#compensationbenefits').animate({
    	left: "+=80",
    	width: parseInt(($('input#compensationbenefits').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#worklifebalance').change(function(){
		$('img#worklifebalance').animate({
    	left: "+=80",
    	width: parseInt(($('input#worklifebalance').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	function sumTotal(){
		var currentTotal = parseInt(($('input#culturevalues').val())) + parseInt(($('input#opportunities').val())) +  
		parseInt(($('input#management').val())) + parseInt(($('input#compensationbenefits').val())) +  
		parseInt(($('input#worklifebalance').val()));
		return currentTotal;
	}

	function checkTotal(){
		var currentTotal = sumTotal()
		if (currentTotal < 100) {
			$('div.total-msg').html("You've allocated " + currentTotal + " points. " + (100-currentTotal) + " left!");
			return false;
		} else if (currentTotal === 100) {
			$('div.total-msg').html("Nice work!  You've allocated all 100 points.");
			return true;
		} else {
			$('div.total-msg').html("Oops, you've over allocated by " + (currentTotal-100) + " points.  Try rebalancing.");
			return false;
		}
	};

	$("#priorities-form").on('submit', function(e) {
		e.preventDefault();
		if (checkTotal()) {
			priorities.culturevalues = parseInt(($('input#culturevalues').val()));
			priorities.opportunities = parseInt(($('input#opportunities').val()));
			priorities.management = parseInt(($('input#management').val()));
			priorities.compensationbenefits = parseInt(($('input#compensationbenefits').val()));
			priorities.worklifebalance = parseInt(($('input#worklifebalance').val()));
			console.log(priorities);
		} else {
			console.log("Not ok");
			return ("Not ok");
		};
	});


});


