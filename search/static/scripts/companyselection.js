//jquery client code
	

$(document).ready(function(){
	var finalCompanyData = [];

	$('#company1').blur(function(){
		var searchBoxID = "company1";
		gdAPICompany($('#company1').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				writeData(data, searchBoxID, selectedCompanyIndex);
			}
		});	
	});

	$('#company2').blur(function(){
		var searchBoxID = "company2";
		gdAPICompany($('#company2').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID, selectedCompanyIndex);
			}
		});	
	});

	$('#company3').blur(function(){
		var searchBoxID = "company3";
		gdAPICompany($('#company3').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID, selectedCompanyIndex);
			}
		});	
	});


	// manages data fetching from glassdoor API
	function gdAPICompany(company, callback){
		var gdAPIData = glassdoorAPIData(company, callback);
	};

	// manages data fetching from clarification modal
	function userClarifySelect(callback) {
		var userSelection = clarifySelect(callback);
		console.log("userSelection " + userSelection);
	};


	// shows company logo on screen, hides search box
	function writeData(gdAPIData, searchBoxID, selectedCompanyIndex) {
		console.log(gdAPIData);
		console.log(searchBoxID);
		console.log(selectedCompanyIndex);
		$('#' + searchBoxID).hide();
		var logoURL = gdAPIData.employers[selectedCompanyIndex].squareLogo
		$('#' + searchBoxID + '-img').prepend('<img src="' + logoURL + '"width="100" />');
		console.log('writeData');
	};
		

	// calls Glassdoor API and returns JSON results
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
						
						
						var selectedCompanyIndex = 0;
						
						if (gdJSONResult.employers.length === 1){
							callback(gdJSONResult, selectedCompanyIndex);
							finalCompanyData.push(gdJSONResult.employers);
						} else {
							clarifyQueryModal(company, gdJSONResult);
							console.log(gdJSONResult);
							clarifySelect(function(selectedCompanyIndex){
								if (selectedCompanyIndex != null) {
									callback(gdJSONResult, selectedCompanyIndex);
								}
								finalCompanyData.push(gdJSONResult.employers[selectedCompanyIndex]);
							});
							cancelClarify();
							
						}

						

					},
					error: function(){
						$('#gd-error-modal').modal('show');
						return null;
					},
						type: 'GET'
				});
		}
	};


	// this function shows a modal with all fo the employer 
	// names from GD API call
	function clarifyQueryModal(company, gdJSONResult) {
		$('#queryNoMatchModal').modal('show');
		jQuery.each(gdJSONResult.employers, function(i) {
			var option = gdJSONResult.employers[i].name;
			var addLine = "<tr><td><input type=\"radio\" class=\"company-clarified\" name=\"company-clarified\" value=\"" + i + "\" id=\"radio- " + option + "\"></td><td><label for= \"" + option + "\">&nbsp" + option + "</label></td></tr>";
			$('#company-clarify-select').append(addLine);
		});
	};



	function clarifySelect(callback) {
		$('#clarify-button').click(function(){
			var selectedCompanyIndex = parseInt($('.company-clarified:checked').val());
			$('#company-clarify-select').empty();
			callback(selectedCompanyIndex);
		return selectedCompanyIndex;
		});
	};


	function cancelClarify(){
		$('#cancel-button').click(function(){
			$('#company-clarify-select').empty();
		});
	}
});

	
	