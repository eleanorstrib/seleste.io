$(document).ready(function(){
	console.log('hi');
	$('#priorities-form').validate({
		rules: {
			culturevalues: {
				min: 0,
				max: 100,
				required: false, 
				number: true,
			},
			management: {
				min: 0,
				max: 100,
				required: false,
				number: true,
			},
			compensationbenefits: {
				min: 0,
				max: 100,
				required: false,
				number: true,
			},
			opportunities: {
				min: 0,
				max: 100,
				required: false,
				number: true,
			},
			worklifebalance: {
				min: 0,
				max: 100,
				required: false,
				number: true,
			},
			recommendtoafriend: {
				min: 0,
				max: 100,
				required: false,
				number: true,
			},

		},
	});

});