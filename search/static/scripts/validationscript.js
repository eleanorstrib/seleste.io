var priorities = {};
$(document).ready(function(){
	

	$('button[type=submit]').attr('disabled', 'disabled');

	// change the size of the image based on the value selected in the box
	$('input#culturevalues').change(function(){
		$('img#culturevalues').animate({
    	center: "+=80",
    	width: parseInt(($('input#culturevalues').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#opportunities').change(function(){
		$('img#opportunities').animate({
    	center: "+=80",
    	width: parseInt(($('input#opportunities').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#management').change(function(){
		$('img#management').animate({
    	center: "+=80",
    	width: parseInt(($('input#management').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#compensationbenefits').change(function(){
		$('img#compensationbenefits').animate({
    	center: "+=80",
    	width: parseInt(($('input#compensationbenefits').val()))*2 + 35,
  		}, 2000, function() {
  			checkTotal()
  	});
	});

	$('input#worklifebalance').change(function(){
		$('img#worklifebalance').animate({
    	center: "+=80",
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
			$('div.total-msg').html("Nice work!  You've allocated all 100 points. <br /> Click 'next' on the bottom of the screen to select companies to compare based on your priorites.");
			addPrioritiesToObject();
			return true;
		} else {
			$('input[type=submit]').prop('disabled', true);
			$('div.total-msg').html("Oops, you've over allocated by " + (currentTotal-100) + " points.  Try rebalancing.");
			return false;
		}
	};


	function addPrioritiesToObject() {
		priorities.culturevalues = parseInt($('input#culturevalues').val());
		priorities.opportunities = parseInt($('input#opportunities').val());
		priorities.management = parseInt($('input#management').val());
		priorities.compensationbenefits = parseInt($('input#compensationbenefits').val());
		priorities.worklifebalance = parseInt($('input#worklifebalance').val());
		addPrioritiesToLocalStorage();
	};	

	function addPrioritiesToLocalStorage(){

		var prioritiesStr = JSON.stringify(priorities);
		console.log(prioritiesStr);
		localStorage.setItem("priorities", prioritiesStr);
		console.log(localStorage);
	};
	

	$("#priorities-form").on('submit', function(e) {
		e.preventDefault();
	});

});


