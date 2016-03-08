$(document).ready(function(){

	// change the size of the image based on the value selected in the box
	$('input#culturevalues').change(function(){
		$('img#culturevalues').animate({
    	left: "+=80",
    	width: parseInt(($('input#culturevalues').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	$('input#opportunities').change(function(){
		$('img#opportunities').animate({
    	left: "+=80",
    	width: parseInt(($('input#opportunities').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	$('input#management').change(function(){
		$('img#management').animate({
    	left: "+=80",
    	width: parseInt(($('input#management').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	$('input#compensationbenefits').change(function(){
		$('img#compensationbenefits').animate({
    	left: "+=80",
    	width: parseInt(($('input#compensationbenefits').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	$('input#worklifebalance').change(function(){
		$('img#worklifebalance').animate({
    	left: "+=80",
    	width: parseInt(($('input#worklifebalance').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	$('input#recommendtoafriend').change(function(){
		$('img#recommendtoafriend').animate({
    	left: "+=80",
    	width: parseInt(($('input#recommendtoafriend').val()))*2 + 35,
  		}, 2000, function() {
  			updateTotal()
  	});
	});

	function checkTotal(){
		if (parseInt(($('input#culturevalues').val())) + parseInt(($('input#opportunities').val())) +  
		parseInt(($('input#management').val())) + parseInt(($('input#compensationbenefits').val())) +  
		parseInt(($('input#worklifebalance').val())) + parseInt(($('input#recommendtoafriend').val())) === 100){
			return true;
		} else {
			return false;
		}
	};

	function updateTotal(){
		if (checkTotal()){
			console.log("looks good");
		} else {
			console.log("not quite");
		}
	}

	$("#priorities-form").on('submit', function(e) {
		e.preventDefault();
		if (checkTotal()) {
			console.log("OK");
			return ("OK");
		} else {
			console.log("Not ok");
			return ("Not ok");
		};
	});


});


