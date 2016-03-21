$(document).ready(function(){
	var priorities = {};

	$('button[type=submit]').attr('disabled', 'disabled');

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
		
		if (currentTotal === 100) {
			$('button[type=submit]').removeAttr('disabled');
		}

		return currentTotal;
	}

	function checkTotal(){
		var currentTotal = sumTotal()
		if (currentTotal < 100) {
			$('div.total-msg').html("You've allocated " + currentTotal + " points. " + (100-currentTotal) + " left!");
			$('input[type=submit]').prop('disabled', true);
			return false;
		} else if (currentTotal === 100) {
			$('div.total-msg').html("Nice work!  You've allocated all 100 points.");
			saveToSession();
			return true;
		} else {
			$('input[type=submit]').prop('disabled', true);
			$('div.total-msg').html("Oops, you've over allocated by " + (currentTotal-100) + " points.  Try rebalancing.");
			return false;
		}
	};

	function saveToSession() {
		if (checkTotal()) {
			priorities.culturevalues = parseInt(($('input#culturevalues').val()));
			priorities.opportunities = parseInt(($('input#opportunities').val()));
			priorities.management = parseInt(($('input#management').val()));
			priorities.compensationbenefits = parseInt(($('input#compensationbenefits').val()));
			priorities.worklifebalance = parseInt(($('input#worklifebalance').val()));
			localStorage.setItem("priorities", JSON.stringify(priorities));
			console.log(localStorage);
		} else {
			// this is a failsafe, button should be disabled in checkTotal anyway
			$('div.total-msg').html("Your allocations need to add up to 100 before you can continue.")
		};
	};

	$("#priorities-form").on('submit', function(e) {
		e.preventDefault();
	});

});


