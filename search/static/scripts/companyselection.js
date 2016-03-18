//jquery client code
	

$(document).ready(function(){

	var finalCompanyData = [];

	$('#company1').blur(function(){
		var searchBoxID = "company1";
		gdAPICompany($('#company1').val(), function(data){
			if (data === null) {
				alert("there was an error");
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID);
			}
		});	
	});

	$('#company2').blur(function(){
		var searchBoxID = "company2";
		gdAPICompany($('#company2').val(), function(data){
			if (data === null) {
				alert("there was an error");
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID);
			}
		});	
	});

	$('#company3').blur(function(){
		var searchBoxID = "company3";
		gdAPICompany($('#company3').val(), function(data){
			if (data === null) {
				alert("there was an error");
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID);
			}
		});	
	});


	// includes callback for API call 
	// GET DATA
	function gdAPICompany(company, callback){
		var gdAPIData = glassdoorAPIData(company, callback);
	};


	function writeData(gdAPIData, searchBoxID){
		 console.log("'#"+searchBoxID+"'");
		$('#' + searchBoxID).val(gdAPIData.employers[0].name);
		$('#' + searchBoxID + '-img').prepend('<img src="' + gdAPIData.employers[0].squareLogo + '"width="100" />');
		console.log('writeData');
	}
		

	// calls Glassdoor API and returns JSON results
	// GETSOMEDATA
    function glassdoorAPIData(company, callback) {
    	company = company.toLowerCase()
		var userAgent='chrome';
			
		apiCall="http://api.glassdoor.com/api/api.htm?t.p="+GDPartner+"&t.k="+GDKey+"&userip="+tempIP+"&useragent="+userAgent+"&format=json&v=1&action=employers&q="+company
		if (company !== ""){
				$.ajax({
					url: apiCall,
					data: {
						format: 'json'
					},
					dataType: 'json',
					success: function(data){

						console.log("API Call ok");
						var gdJSONResult = JSON.stringify(data.response);
						gdJSONResult = JSON.parse(gdJSONResult);
						callback(gdJSONResult);
						if (gdJSONResult.employers.length === 1){
							finalCompanyData.push(gdJSONResult.employers);
							console.log(finalCompanyData);
						} else {
							clarifyQueryModal(company, gdJSONResult);
						}
					},
					error: function(){
						alert("didn't work");
						return null;
					},
						type: 'GET'
				});
		}
		
		console.log("API data attempted");
	};



	
	// function handleAPIResults(gdAPIData){
	// 	if ((gdAPIData.employers).length === 1) {
	// 			gdAPICompanyResults.push(gdAPIData.employers[0]);
	// 			console.log(gdAPIData);
	// 			return gdAPICompanyResults;
	// 		} else {
	// 			console.log("nooO!!");
	// 		}
	// };


	// this function shows a modal with all fo the employer 
	// names from GD API call
	function clarifyQueryModal(company, gdJSONResult) {
		$('#queryNoMatchModal').modal('show');
		console.log("ClarifyModaul ok");
		jQuery.each(gdJSONResult.employers, function(i) {
			var option = gdJSONResult.employers[i].name;
			var addLine = "<tr><td><input type=\"radio\" class=\"company-clarified\" name=\"company-clarified\" value=\"" + i + "\" id=\"radio- " + option + "\"></td><td><label for= \"" + option + "\">&nbsp" + option + "</label></td></tr>";
			$('#company-clarify-select').append(addLine);
		});
	};



	// function writeCompanyData(gdJSONResult) {
	// 	console.log("in function getCompanyData");
	// 	$('#clarify-button').click(function(){
	// 		console.log("selectedCompany");
	// 		console.log(gdJSONResult);
	// 		var clarifySelectionIndex = parseInt($('.company-clarified:checked').val()) || 0;
	// 		var clarifySelectionName = gdJSONResult.employers[clarifySelectionIndex].name;
	// 		var clarifySelectionLogo = gdJSONResult.employers[clarifySelectionIndex].squareLogo;
	// 		var addToArray = gdJSONResult.employers[clarifySelectionIndex];
	// 		if (addToArray != undefined) {
	// 			gdAPICompanyResults.push(addToArray);
	// 		}
	// 		$('#company-clarify-select').empty();
	// 	});
	// };

	// function cancelClarify(){
	// 	$('#cancel-button').click(function(){
	// 		console.log("cancelClarify");
	// 		var clarifySelection = $('.company-clarified:checked').val('');
	// 		$('#company-clarify-select').empty();
	// 	});
	// }
});

	// run API query on validation when user gets out of the field
	
	